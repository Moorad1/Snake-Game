var nxt = 10;
var frames = 10;
var scr = 0;
var s;
var scl = 10;
var food;
var Text;

function setup() {
  cnvs = createCanvas(windowWidth / 1.4 - (windowWidth / 1.4 % scl), windowHeight / 1.4 - (windowHeight / 1.4 % scl));
  cnvs.position(windowWidth / 2 - (width / 2), windowHeight / 2 - (height / 2));
  s = new Snake();

  loca();

}

function loca() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  frameRate(frames);
  tracker();
  background(51);
  score();

  if (s.eat(food)) {
    loca();
  }

  s.death();
  s.update();
  s.show();

  fill(231, 76, 60);
  noStroke();
  rect(food.x, food.y, scl, scl);

}




function keyPressed() {
  if ((keyCode === UP_ARROW || keyCode === 87) && this.down != true) {
    s.dir(0, -1);
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = false;
  } else if ((keyCode === DOWN_ARROW || keyCode === 83) && this.up != true) {
    s.dir(0, 1);
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = true;
  } else if ((keyCode === RIGHT_ARROW || keyCode === 68) && this.left != true) {
    s.dir(1, 0);
    this.left = false;
    this.right = true;
    this.up = false;
    this.down = false;
  } else if ((keyCode === LEFT_ARROW || keyCode === 65) && this.right != true) {
    s.dir(-1, 0);
    this.left = true;
    this.right = false;
    this.up = false;
    this.down = false;
  }
}

this.Snake = function() {
  this.x = 0;
  this.y = 0;
  this.xs = 1;
  this.ys = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      scr++;
      return true;
    } else {
      return false;
    }
  };

  this.dir = function(x, y) {
    this.xs = x;
    this.ys = y;
  };

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log("You were: " + (this.total + 1) + " squares long");
        this.total = 0;
        this.tail = [];
        scr = 0;
        frames = 10;
      }
    }
  };

  this.update = function() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xs * scl;
    this.y = this.y + this.ys * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  };

  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);

  }
}

function score() {
  fill(101, 101, 101)
  textSize(200)
  textAlign(RIGHT)
  text(scr, width, height)
}

function tracker() {
  if (scr == nxt) {
    frames += 5
    nxt += 10
  }
}