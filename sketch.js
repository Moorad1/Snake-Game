var nxt = 10;
var frames = 10;
var scr = 0;
var hscr = 0;
var scl = 30;
var s;
var food;
var Text;
var num = 1;
var BW = false;



function preload() {
  img = loadImage("crown.png");
  font = loadFont("Font.ttf");
}

function setup() {
  cnvs = createCanvas(windowWidth / 1.4 - (windowWidth / 1.4 % scl), windowHeight / 1.2 - (windowHeight / 1.2 % scl));
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
  background("#8eb366");
  score();
  highscore();

  fill(52, 56, 27, 200);
  noStroke();
  rect(food.x, food.y, scl, scl, 5);

  if (s.eat(food)) {
    loca();
  }

  s.death();
  s.update();
  s.show();


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
  if (keyCode == 69) {
    colour();
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
    fill(53, 56, 27);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl, 5);
    }
    rect(this.x, this.y, scl, scl, 5);

  };
};

function score() {
  textSize(50);
  fill(52, 56, 27, 150);
  textAlign(LEFT);
  text(scr, 20, 80);
}

function tracker() {
  if (scr == nxt) {
    frames += 2;
    nxt += 10;
  }
}


function highscore() {
  if (scr > hscr) {
    hscr = scr;
  }
  textSize(50);
  textFont(font);
  fill(52, 56, 27, 150);
  textAlign(RIGHT);
  textscr = text(hscr, width - 20, 80);
  image(img, width - 48, 5, 30, 30);
}

function colour() {
  if (BW === true) {
    console.log("OLD");
    BW = false;
  } else {
    console.log("Colour");
    BW = true;
    background(20);
  }
}