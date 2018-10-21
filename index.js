var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 680;
canvas.height = 680;
var up = down = right = left = false
var size = 34
var themes = [{bg:"#033341",snake:"#00E0B4",food:"#00E0B4"},{bg:"#001919",snake:"#E8375D",food:"#B6FF00"},{bg:"#04FCAF",snake:"#04CE9B",food:"#FFFFFF"},{bg:"#00A5FF",snake:"#0087E8",food:"#FF5656"},{bg:"#8EB366",snake:"#35381B",food:"#48532B"},{bg:"#000000",snake:"#ffffff",food:"#ffffff"}]
var snake = [{x:136,y:136},{x:136,y:170},{x:170,y:170},{x:170,y:204},{x:170,y:238}];
var food = {
	x:Math.floor(Math.random()*(canvas.width/size))*size,
	y:Math.floor(Math.random()*(canvas.height/size))*size
}
var dir = "down";
var score;
var bgColour = themes[0].bg
var snakeColour = themes[0].snake
var foodColour = themes[0].food
var mainMenu = true
var logo = new Image()
var currentTheme = 0;
logo.src = "Images/Logo.png"
hello = setInterval(update,100)	

canvas.addEventListener("click",function(ev) {
	mx = ev.offsetX;
	my = ev.offsetY;
	console.log(mx+" : "+my)
	
	if ((canvas.width/2)-150 <= mx && mx <= ((canvas.width/2)-150)+300 && (canvas.height/3)+25 <= my && my <= (canvas.height/3)+75) {
		snake = [{x:136,y:136}]
		dir = "none";
		food = {
			x:Math.floor(Math.random()*(canvas.width/size))*size,
			y:Math.floor(Math.random()*(canvas.height/size))*size
		}
		mainMenu = false
	}
})



function update() {
	if (mainMenu) {
		randomControls()
		wrappingCollision()
	}
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = bgColour
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = snakeColour; 
	for (var i = 0;i < snake.length;i++) {
		ctx.fillRect(snake[i].x,snake[i].y,size,size)
	}
	ctx.fillStyle = foodColour;
	ctx.fillRect(food.x,food.y,size,size)

	oldSnakeX = snake[0].x;
	oldSnakeY = snake[0].y;

	if (oldSnakeX ==  food.x && oldSnakeY == food.y) {
		food.x = Math.floor(Math.random()*(canvas.width/size))*size
		food.y = Math.floor(Math.random()*(canvas.height/size))*size
	} else {
	
		snake.pop()
	
	}
	if (dir == "up") {
		oldSnakeY -= size
	} else if (dir == "down") {
		oldSnakeY += size
	} else if (dir == "left") {
		oldSnakeX -= size
	} else if (dir == "right") {
		oldSnakeX += size
	}

	snake.unshift({x:oldSnakeX,y:oldSnakeY})
	if(mainMenu) {
	ctx.drawImage(logo,(canvas.width/2)-(576/2),(canvas.height/4)-(324/2),576,324)
	ctx.fillStyle = "#232323"
	ctx.lineWidth = 4
	ctx.strokeStyle = "#FFFFFF"
	ctx.strokeRect((canvas.width/2)-150,(canvas.height/3)+25,300,50)
	ctx.fillStyle = "#ffffff"
	ctx.font = "30px Arial"
	ctx.textAlign = "center"
	ctx.fillText("Start",(canvas.width/2),(canvas.height/3)+60)
	}
}

function theme(index) {
	bgColour = themes[index].bg;
	snakeColour = themes[index].snake
	foodColour = themes[index].food
}

document.onkeydown = function(e) {
if (!	mainMenu) {
	if (e.keyCode == 38 && !(dir == "down")) {
		dir = "up";
	} else if (e.keyCode == 40 && !(dir == "up")) {
		dir = "down";
	} else if (e.keyCode == 37 && !(dir == "right")) {
		dir = "left";
	} else if (e.keyCode == 39 && !(dir == "left")) {
		dir = "right";
	}
	}
	if (e.keyCode == 84) {
		currentTheme ++;
		theme(currentTheme%themes.length)
	}
} 

function randomControls() {
	control = Math.floor(Math.random()*25)
	if (control == 0) {
		dir = "up"
	} else if (control == 1) {
		dir = "down"
	} else if (control == 2) {
		dir = "left"
	} else if (control == 3) {
		dir = "right"
	} 
}

function restart() {
var snake = [{x:136,y:136},{x:136,y:170},{x:170,y:170},{x:170,y:204},{x:170,y:238}];
var food = {
	x:Math.floor(Math.random()*(canvas.width/size))*size,
	y:Math.floor(Math.random()*(canvas.height/size))*size
}
var dir = "down";
var score = 0;
}

function wrappingCollision() {
	for (var e = 0; e < snake.length;e++) {
		if (snake[e].x < 0) {
			snake[e].x = canvas.width-size
		} 
		if (snake[e].x > canvas.height) {
			snake[e].x = 0
		}
		if (snake[e].y < 0) {
			snake[e].y = canvas.height-size
		} 
		if (snake[e].y > canvas.height) {
			snake[e].y = 0
		}
	}
}

function collision() {

}