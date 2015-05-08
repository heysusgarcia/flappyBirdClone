var GAME_HEIGHT = 480;
var GAME_WIDTH = 640;
var FRAME_RATE = 1000/60;
var PIPE_WIDTH = 30;
var BIRD_WIDTH = 40;
var BIRD_HEIGHT = 30;
var GRAVITY = 0.1;
var BIRD_COLOR = "yellow";
var BACKGROUND_COLOR = "skyblue";
var PIPE_COLOR = "green";
var GAP_DISTANCE = 100;
var PIPE_DISTANCE = 220;
var INIT_PIPE_POS = 960;
var PIPE_VELOCITY = 2;
var PIPE_WIDTH = 30;

function Game(context) {
  this.context = context;
  this.bird = new Bird(GAME_WIDTH / 2, GAME_HEIGHT / 2);
  this.level = new Level();
  this.currentPipe = this.level.pipes[0];
  this.currentPipeIndex = 0;
  this.score = 0;

  var canvas = document.getElementById("flappy");
  canvas.addEventListener('mousedown', this.handleMousedown.bind(this));
};

Game.prototype = {
  tick: function() {
    this.clear();
    this.level.tick(this.context);
    this.bird.tick(this.context);
    this.score = this.level.pipesShiftedCount;

    if (this.hasCollisions()) {
      alert("Game Over");
      clearInterval(this.setInterval);
      location.reload();
    }

    if (this.currentPipeIndex === 0 && this.currentPipe.x + PIPE_WIDTH < this.bird.x) {
      this.currentPipeIndex += 1;
      this.level.pipesShiftedCount += 1;
    }

    this.currentPipe = this.level.pipes[this.currentPipeIndex];
    this.drawScore();
  },

  play: function() {
    this.setInterval = setInterval(function() {
      this.tick();
    }.bind(this), FRAME_RATE);
  },

  handleMousedown: function(event) {
    this.bird.flap();
  },

  clear: function() {
    this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  },

  hasCollisions: function() {
    if (this.bird.y + BIRD_HEIGHT >= this.level.groundHeight) {
      return true;
    }

    if (this.bird.y > this.currentPipe.y && this.bird.y < this.currentPipe.y + GAP_DISTANCE) {
      //in the gap
      return false;
    } else if (this.bird.x < this.currentPipe.x && this.bird.x + BIRD_WIDTH < this.currentPipe.x) {
      //left side of bird to left of left side of pipe
      //&&
      //right side of bird to left of left side of pipe
      //bird is in front of pipe
      return false;
    } else if (this.bird.x > this.currentPipe.x + PIPE_WIDTH && this.bird.x + BIRD_WIDTH > this.currentPipe.x + PIPE_WIDTH) {
      //bird is behind pipe
      return false;
    } else {
      return true;
    }
  },

  drawScore: function() {
    this.context.font = "20px Verdana";
    this.context.fillText("SCORE:" + this.score, 20, 20);
  }
};
