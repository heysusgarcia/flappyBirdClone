function Level() {
  this.pipes = [];
  this.pipesShiftedCount = 0;
  this.groundHeight = 0.9 * GAME_HEIGHT;

  for (var i = 0; i < 3; i++) {
    this.pipes.push(
      { x: INIT_PIPE_POS + i * PIPE_DISTANCE , y: randomRange(200, 600) * GAME_HEIGHT }
    );
  }
}

function randomRange(min, max) {
  return ((Math.random() * (max - min) + min)/1000)
};

Level.prototype = {
  drawBackground: function(context) {
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  },

  movePipes: function() {
    var firstPipe = this.pipes[0];
    var lastPipe = this.pipes[this.pipes.length - 1];
    if (firstPipe.x <= 0) {
      this.pipes.shift();
      this.pipesShiftedCount += 1;
      this.pipes.push(
        { x: lastPipe.x + PIPE_DISTANCE, y: randomRange(200, 600) * GAME_HEIGHT }
      );
    }

    this.pipes.forEach(function(pipe) {
      pipe.x -= PIPE_VELOCITY;
    });
  },

  drawPipes: function(context) {
    var that = this;
    this.pipes.forEach(function(pipe) {
      context.fillStyle = PIPE_COLOR;
      context.fillRect(
        pipe.x,
        0,
        PIPE_WIDTH,
        pipe.y
      );
      context.fillRect(
        pipe.x,
        pipe.y + GAP_DISTANCE,
        PIPE_WIDTH,
        GAME_HEIGHT
      )
    });
  },

  drawGround: function(context) {
    context.fillStyle = PIPE_COLOR;
    context.fillRect(
      0,
      this.groundHeight,
      GAME_WIDTH,
      GAME_HEIGHT
    );
  },

  tick: function(context) {
    this.drawBackground(context);
    this.drawGround(context);
    this.movePipes();
    this.drawPipes(context);
  }
}
