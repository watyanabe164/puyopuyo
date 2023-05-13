function agario() {
  // ゲームの初期化
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var cells = [];
  var mouse = {
    x: 0,
    y: 0
  };

  // メインループ
  function loop() {
    // マウスの位置を更新する
    mouse.x = window.mouseX;
    mouse.y = window.mouseY;

    // すべてのセルを更新する
    cells.forEach(function(cell) {
      cell.update(mouse);
    });

    // キャンバスにすべてのセルを描画する
    cells.forEach(function(cell) {
      cell.draw(ctx);
    });

    // 次のフレームを更新する
    requestAnimationFrame(loop);
  }

  // セルの初期化
  function Cell(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  // セルの更新
  Cell.prototype.update = function(mouse) {
    // マウスに向かって移動する
    this.x += (mouse.x - this.x) / 100;
    this.y += (mouse.y - this.y) / 100;

    // 画面の境界にぶつかったら反射する
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > canvas.width) {
      this.x = canvas.width;
    }

    if (this.y < 0) {
      this.y = 0;
    } else if (this.y > canvas.height) {
      this.y = canvas.height;
    }

    // 他のセルと衝突したら、それらを吸収する
    cells.forEach(function(otherCell) {
      if (this !== otherCell && this.intersects(otherCell)) {
        this.size += otherCell.size;
        otherCell.remove();
      }
    }, this);
  };

  // セルの描画
  Cell.prototype.draw = function(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  };

  // セルが他のセルと交差しているかどうかをチェックする
  Cell.prototype.intersects = function(otherCell) {
    return this.x - this.size / 2 < otherCell.x + otherCell.size / 2 &&
           this.x + this.size / 2 > otherCell.x - otherCell.size / 2 &&
           this.y - this.size / 2 < otherCell.y + otherCell.size / 2 &&
           this.y + this.size / 2 > otherCell.y - otherCell.size / 2;
  };

  // セルの削除
  Cell.prototype.remove = function() {
    cells = cells.filter(function(cell) {
      return cell !== this;
    }, this);
  };

  // 最初のセルを作成して追加する
  cells.push(new Cell(canvas.width / 2, canvas.height / 2, 10));

  // メインループを開始する
  loop();
}

// ゲームを初期化する
agario();
