var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var puyos = [];

function draw() {
  //キャンバスをクリアするコードを削除する

  for (var i = 0; i < puyos.length; i++) {
    var puyo = puyos[i];
    ctx.fillStyle = puyo.color;
    ctx.fillRect(puyo.x, puyo.y, puyo.width, puyo.height);
  }

  requestAnimationFrame(draw);
}


function newPuyo() {
  var puyo = {
    x: Math.floor(Math.random() * (canvas.width - 2 * puyo.width)),
    y: 0,
    color: "red"
  };
  puyos.push(puyo);
}

function movePuyosDown() {
  for (var i = 0; i < puyos.length; i++) {
    var puyo = puyos[i];
    puyo.y++;
  }
}

function checkCollisions() {
  for (var i = 0; i < puyos.length; i++) {
    for (var j = i + 1; j < puyos.length; j++) {
      var puyo1 = puyos[i];
      var puyo2 = puyos[j];
      if (puyo1.x == puyo2.x && puyo1.y == puyo2.y) {
        // Collision!
        // Remove the two puyos from the game.
        puyos.splice(i, 1);
        puyos.splice(j - 1, 1);
      }
    }
  }
}

function startGame() {
  // Start the game loop.
  requestAnimationFrame(draw);
}

window.onload = startGame;
