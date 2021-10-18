(function() {

  const left_btn = document.getElementById('left');
  const right_btn = document.getElementById('right');
  const up_btn = document.getElementById('up');
  const down_btn = document.getElementById('down');

  var myGamePiece;
  var obstacle1;
  var obstacle2;
  var obstacle3;
  var obstacle4;


  function startGame() {
      myGameArea.start();
      myGamePiece = new component(50, 50, "#088a08", 250, 250, 1);
      obstacle1 = new component(30, 30, "red", 100, 90, getRandomNumberBetween(1,8));
      obstacle2 = new component(30, 30, "red", 370, 50, getRandomNumberBetween(1,8));
      obstacle3 = new component(30, 30, "red", 290, 120, getRandomNumberBetween(1,8));
      obstacle4 = new component(30, 30, "red", 300, 480, getRandomNumberBetween(1,8));
  }

  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 550;
      this.canvas.height = 550;
      this.context = this.canvas.getContext("2d");
      document.getElementById('main').appendChild(this.canvas);
      this.interval = setInterval(updateGameArea, 500);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
    clearInterval(this.interval);
  }
  }

  function component(width, height, color, x, y, dir) {
    this.width = width;
    this.height = height;
    this.speedX = 20;
    this.speedY = 20;
    this.posX = 0;
    this.posY = 0;
    this.dir = dir;

    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

    this.newPos = function() {
      this.x = this.x;
      this.y = this.y;
    }

    this.obsPosition = function() {

      switch (this.dir) {
        case 1:
          if (this.y == 0){
            this.dir = 4;
          }
          else {
            this.x = this.x;
            this.y -= 10;
          }
          break;
        case 2:
          if (this.y == 0 || this.x == 520){
            this.dir = 5;
          }
          else {
            this.x += 10;
            this.y -= 10;
          }
          break;
        case 3:
          if (this.x == 520){
            this.dir = 6;
          }
          else {
            this.x += 10;
            this.y = this.y;
          }
          break;
        case 4:
          if (this.x == 520 || this.y == 520){
            this.dir = 7;
          }
          else {
            this.x += 10;
            this.y += 10;
          }
          break;
        case 5:
          if (this.y == 520){
            this.dir = 8;
          }
          else {
            this.x = this.x;
            this.y += 10;
          }
          break;
        case 6:
          if (this.y == 520 || this.x == 0){
            this.dir = 1;
          }
          else {
            this.x -= 10;
            this.y += 10;
          }
          break;
        case 7:
          if (this.x == 0){
            this.dir = 2;
          }
          else {
            this.x -= 10;
            this.y = this.y;
          }
          break;
        case 8:
          if (this.x == 0 || this.y == 0 || (this.x == 0 && this.y == 0)){
            this.dir = 3;
          }
          else {
            this.x -= 10;
            this.y -= 10;
          }
      }

    }

    this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }




  }


  function updateGameArea() {

      if (myGamePiece.crashWith(obstacle1)) {
        myGameArea.stop();
        alert('finished');
      }
      else if(myGamePiece.crashWith(obstacle2)) {
        myGameArea.stop();
        alert('finished');
      }
      else if(myGamePiece.crashWith(obstacle3)) {
        myGameArea.stop();
        alert('finished');
      }
      else if(myGamePiece.crashWith(obstacle4)) {
        myGameArea.stop();
        alert('finished');
      }
      else {
        myGameArea.clear();

        myGamePiece.newPos();
        myGamePiece.update();


        obstacle1.obsPosition();
        obstacle1.update();


        obstacle2.obsPosition();
        obstacle2.update();


        obstacle3.obsPosition();
        obstacle3.update();


        obstacle4.obsPosition();
        obstacle4.update();
      }
    }

  function moveUp() {
    if(myGamePiece.y >= 10) {
      myGamePiece.y -= 10;
    }
    updateGameArea();
  }

  function moveDown() {
    if(myGamePiece.y <= 490) {
      myGamePiece.y += 10;
    }
    updateGameArea();
  }

  function moveLeft() {
    if(myGamePiece.x >= 10) {
      myGamePiece.x -= 10;
    }
    updateGameArea();
  }

  function moveRight() {
    if(myGamePiece.x <= 490) {
      myGamePiece.x += 10;
    }
    updateGameArea();
  }

  left_btn.addEventListener('click', moveLeft);
  right_btn.addEventListener('click', moveRight);
  up_btn.addEventListener('click', moveUp);
  down_btn.addEventListener('click', moveDown);

  document.onkeydown = checkKey;
  function checkKey(e) {
      e = e || window.event;
      if (e.keyCode == '38') {
          moveUp();
      }
      else if (e.keyCode == '40') {
          moveDown();
      }
      else if (e.keyCode == '37') {
         moveLeft();
      }
      else if (e.keyCode == '39') {
         moveRight();
      }

  }
  function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  startGame();

})();
