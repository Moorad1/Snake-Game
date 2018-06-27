var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 680;
canvas.height = 680; 

var player = {
	x:320,
	y:320,
	moveX:0.04,
	moveY:0,
	spd:0.04
};

update();

function update() {
	window.requestAnimationFrame(update);
	ctx.clearRect(0,0,canvas.width,canvas.height)
	checkerPattern();
	move()
	ctx.fillStyle = "#369DE2"
	ctx.fillRect(player.x,player.y,40,40);
}	

document.onkeydown = function(event) {
	key = event.keyCode;
	
	if (key == 38) { // Up
		player.moveY = -player.spd
		player.moveX = 0
	} else if (key == 40) { // Down
		player.moveY = player.spd
		player.moveX = 0
	} else if (key == 37) { // Left
		player.moveX = -player.spd
		player.moveY = 0
	} else if (key == 39) { // Right
		player.moveX = player.spd
		player.moveY = 0
	}
}

function checkerPattern() {
	for (var i = 0;i < canvas.height/40;i++) {
		for (var e = 0;e < canvas.width/40;e++) {
			if (i % 2 == 0) {
				if (e % 2 == 0) {ctx.fillStyle = "#27AE60";}
				else {ctx.fillStyle = "#2ECC71";}
				ctx.fillRect(e*40,i*40,40,40);
			} else {
				if (e % 2 == 0) {ctx.fillStyle = "#2ECC71";}
				else {ctx.fillStyle = "#27AE60";}
					ctx.fillRect(e*40,i*40,40,40);
			}
		}
	}
}

function move() {
	player.x += player.moveX*40
	player.y += player.moveY*40
}