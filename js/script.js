(() => {
  const theCanvas = document.querySelector('canvas'),
        ctx = theCanvas.getContext('2d'),
        player = { x : 275, y : 550, width : 50, height : 50, lives : 3, speed : 7 },
        bullets = [],
        mouseTracker = { x : theCanvas.width/2)},
        enemy1 = document.querySelector('.enemyOne'),
        enemy2 = document.querySelector('.enemyTwo'),
        enemy3 = document.querySelector('.enemyThree'),
        boxes = [
          { x : 30, y : 30, x1 : 30, y1 : 30, image : enemy1, xspeed : 5, yspeed : 8, points : 10},
          { x : 90, y : 90, x1 : 40, y1 : 40, image : enemy2, xspeed : 5, yspeed : 8, points : 5},
          { x : 150, y : 150, x1 : 30, y1 : 30, image : enemy3, xspeed : 5, yspeed : 8, points : 10},
        ],
        pauseButton = document.querySelector('.pause'),
        playButton = document.querySelector('.play'),
        resetButton = document.querySelector('.reset'),
        resetScreen = document.querySelector('.level-up')
        playerImg = document.querySelector('.ship');

      var playState = true;
      score = 0;

  function draw() {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.font = '18px sans-serif';
    ctx.fillText(`Score: ${score}`, 500 , 20);

    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    bullets.forEach((bullet, index) => {
      ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
      ctx.fillRect(bullet.x, bullet.y, bullet.x2, bullet.y2);

      bullet.y -= bullet.speed;

      bulletIndex = index;

      boxes.forEach((box, index) =>{
        if (bullet.y <= (box.y + box.y1) && bullet.y > box.y && bullet.x > box.x && bullet.x < (box.x + box.x1)) {
          //delete boxes [index];
        //  delete bullets[bulletIndex];
        bullets.splice(bulletIndex, 1);
        boxes.splice(index, 1);

        score += box.points;
        console.log(`score is nowL ${score}`);

          let boomsound = document.createElement('audio');
          boomsound.src = "assets/audio/explosion.mp3";

          document.body.appendChild(boomsound);
            boomsound.addEventListener('ended',() => {
              document.body.removeChild(boomsound);
            });


            boomsound.play();

            if (boxes.length == 0 ) {
              console.log('level up!');
              levelUp();
            }
        }
      });


      if(bullet.y < 0) {
        //delete bullets[index];
        bullets.splice(index, 1);
      }
    });

    boxes.forEach(box => {
      ctx.fillStyle = box.color;
      ctx.drawImage(box.image, box.x, box.y, box.x1, box.y1);

      if (box.x + box.x1 > theCanvas.width) {
        box.xspeed *=-1;
      } else if (box.x < 0){
        box.xspeed *=-1;
      }

      if (box.y + box.y1 > theCanvas.height) {
        box.yspeed *=-1;
      } else if (box.y < 0){
        box.yspeed *=-1;
      }


      box.x += box.xspeed;
      box.y += box.yspeed;
    })

    if (playState == false) { return }

    window.requestAnimationFrame(draw);
  }


  //function movePlayer(e) {
  //  switch(e.keyCode) {
  //    case 37 :
  //    if (player.x > 0) {
  //      player.x -= player.speed;
//      }
  //    break;

  //    case 39 :
  //    if (player.x + player.width < theCanvas.width) {
  //        player.x += player.speed;
  //    }
  //    break;

  //    default:
  //  }
//  }

  function moveShip(e) {
  //  player.x = e.clientX - theCanvas.offsetLeft;
  mousPos = (e.clientX - theCanvas.offsetLeft) - player.width /2;

  mouseTracker.x = e.clientX - theCanvas.offsetLeft;
  }

  function createBullet() {
    let newBullet = {
      x : (player.x + player.width/2 - 2.5),
      y : (theCanvas.height - player.height - 10),
      x2 : 5,
      y2 : 10,
      speed : 12
    }
    let laser = document.createElement('audio');
    laser.src = "assets/audio/laser.mp3"
    document.body.appendChild(laser);

    laser.addEventListener('ended', () => {
      document.body.removeChild(laser);
    });

    laser.play();

    bullets.push(newBullet);
  }

  function pauseGame() {
    playState = false;
  }

  function playGame() {
    playState = true;
    window.requestAnimationFrame(draw);
  }

  function levelUp() {
    //debugger;

    playstate = false;
    resetScreen.classList.add()

  }

function resetGame(){

}

  //window.addEventListener('keydown', movePlayer);
  window.requestAnimationFrame(draw);

  theCanvas.addEventListener('click', createBullet);
  theCanvas.addEventListener('mousemove', moveShip);

  pauseButton.addEventListener('click', pauseGame);
  playButton.addEventListener('click', playGame);

  resetButton.addEventListener('click', resetGame);

})();
