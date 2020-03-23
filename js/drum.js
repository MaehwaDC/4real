
//1238 ширина контейнера по дизайну
var drum = new Phaser.Game(9999, 110, Phaser.CANVAS, 'drum', {
  init: function () {
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    // число победитель
    this.imageWidht = 172;
    this.drumMoving = false;
    
    this.skins = [];
    // позицию стрелки относилтельно канваса, +10 - стрелка чуть пролетает, нужна для более точного попадания стрелки
    var gameContainer = document.getElementById('drum');
    this.arrowXPos = gameContainer.clientWidth / 2 + 10;
    console.log(this.arrowXPos)
    this.timeConstant = 3800; //really mimic iOS
  },
  
  preload: function() {
    this.game.load.image('item', 'build/images/drum/back-image.png');
    this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
  },

  create: function () {
    this.game.kineticScrolling.start();

    var initX = 0;

    for (var i = 0; i < 200; i++) {
      this.skins.push(this.createImage(initX, 0, this.imageWidht));
      initX += this.imageWidht;
    }
    this.game.world.setBounds(0, 0, this.imageWidht * this.skins.length , this.game.height);
  },

  update: function () {
    if (this.drumMoving) {
      // переменная связанная со временем, отвечает за изменения граффика поведения скороси
      var elapsed = Date.now() - this.timestamp;
      var delta = this.target * Math.exp((-elapsed / this.timeConstant) * this.speed);
      if (delta > 0.5) {
        this.game.camera.x = this.target - delta;
        // разкоментить для проверки номера картинки под стрелкой в реалтайме
        console.log(((this.game.camera.x + this.arrowXPos) / this.imageWidht) + 1)
      }
      else {
        this.game.camera.x = this.target;
        this.drumMoving = false;
        this.game.kineticScrolling.start();
      }
    }

    if (drum.drumMoovingStarted && !this.drumMoving) {
      this.beginMove();
      drum.drumMoovingStarted = false;
    }
  },

  beginMove: function () {
    this.game.kineticScrolling.stop();
    this.winNumber = drum.winNumber;
    this.speed = drum.speed;
    // рандоманя позиция в пределах картинки
    var rendPos = this.getRendomPos(50, this.imageWidht - 150);

    // позиция курсора над картинкой относительно начала игры
    this.target = Math.round(this.imageWidht * this.winNumber - this.arrowXPos - rendPos);
    this.timestamp = Date.now();
    this.drumMoving = true;
  },

  createImage: function (x, y, w) {
    var sprite = this.game.add.sprite(x, y, 'item');
    sprite.width = w;
    return sprite;
  },

  getRendomPos: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}, true, true);

drum.drumInit = function (skins, speed) {
  drum.skins = skins;
  drum.speed = speed;
}

drum.startDrumMooving = function (winNumber) {
  drum.winNumber = winNumber;
  drum.drumMoovingStarted = true;
}

// drum.startDrumMooving([], 1, 84)

console.log(drum)
