function Bird(x, y) {
  this.x = x;
  this.y = y;
  this.velocity = 0;
};

Bird.prototype = {
  move: function() {
    this.y += this.velocity;
    this.velocity += GRAVITY;
  },

  draw: function(context) {
    context.fillStyle = BIRD_COLOR;
    context.fillRect(
      // this.x - WIDTH / 2,
      // this.y - HEIGHT / 2,
      this.x,
      this.y,
      BIRD_WIDTH,
      BIRD_HEIGHT
    );
  },

  tick: function(context) {
    this.move();
    this.draw(context);
  },

  flap: function() {
    this.velocity += -7;
  },

  getBounds: function() {
    return {
      topLeft: [this.x, this.y],
      bottomRight: [this.x + BIRD_WIDTH, this.y + BIRD_HEIGHT]
    }
  }
};
