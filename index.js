const gamepad = new Gamepad();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var input = document.getElementById('input');
// eslint-disable-next-line no-undef
var socket = io('snake-zjkzhcfxsc.now.sh');
var size = 36;
var oscore = 0;
var name = 'player'+Math.floor(Math.random()*9999)
var themes = [{
	bg: '#0291ff',
	snake: '#0165b2',
	food: '#033341'
}, {
	bg: '#001919',
	snake: '#E8375D',
	food: '#B6FF00'
}, {
	bg: '#04FCAF',
	snake: '#04CE9B',
	food: '#FFFFFF'
}, {
	bg: '#00A5FF',
	snake: '#0087E8',
	food: '#FF5656'
}, {
	bg: '#8EB366',
	snake: '#35381B',
	food: '#48532B'
}, {
	bg: '#000000',
	snake: '#ffffff',
	food: '#ffffff'
}];
var snake = [{
	x: 144,
	y: 144,
}, {
	x: 144,
	y: 170
}, {
	x: 170,
	y: 170
}, {
	x: 170,
	y: 204
}, {
	x: 170,
	y: 238
}];

var mMLeaderboard = {
	scores:[],
	names:[]
};

var user =	true;
var food = {
	x: Math.floor(Math.random() * (canvas.width / size)) * size,
	y: Math.floor(Math.random() * (canvas.height / size)) * size,
	random: Math.floor(Math.random() * 100)
};
var dir = 'down';
var score = 0;
var bgColour = themes[0].bg;
var snakeColour = themes[0].snake;
var mainMenu = true;
var logo = new Image();
var currentTheme = 0;
var leaderboard = false;
var opacity = {
	sp: '00',
	mp: '00',
	lb: '00'
};
var multiplayer = false;
var players = [];
var multiplier = 1;
logo.src = 'Images/Logo.png';
setInterval(update, 100);


gamepad.on('press', 'd_pad_right', () => {
	dir = (dir != 'left') ? 'right' : 'left';
});

gamepad.on('press', 'd_pad_left', () => {
	dir = (dir != 'right') ? 'left' : 'right';
});

gamepad.on('press', 'd_pad_up', () => {
	dir = (dir != 'down') ? 'up' : 'down';
});

gamepad.on('press', 'd_pad_down', () => {
	dir = (dir != 'up') ? 'down' : 'up';
});

gamepad.on('press', 'shoulder_top_right', () => {
	currentTheme++;
	theme(currentTheme % themes.length);
});

// input.addEventListener('change', () => {
// 	user = false;
// 	input.style.display = 'none';
// })

canvas.addEventListener('click', function (ev) {
	var mx = ev.offsetX;
	var my = ev.offsetY;
	if (mainMenu) {
		if ((canvas.width / 2) - 150 <= mx && mx <= ((canvas.width / 2) - 150) + 300 && (canvas.height / 3) + 25 <= my && my <= (canvas.height / 3) + 75) {
			snake = [{
				x: 144,
				y: 144
			}];
			dir = 'none';
			food = {
				x: Math.floor(Math.random() * (canvas.width / size)) * size,
				y: Math.floor(Math.random() * (canvas.height / size)) * size
			};
			mainMenu = false;
		} else if (((canvas.width / 2) - 150 <= mx && mx <= ((canvas.width / 2) - 150) + 300 && (canvas.height / 3) + 100 <= my && my <= (canvas.height / 3) + 150)) {
			snake = [{
				x: 144,
				y: 144
			}];
			dir = 'none';
			food = {
				x: Math.floor(Math.random() * (canvas.width / size)) * size,
				y: Math.floor(Math.random() * (canvas.height / size)) * size
			};
			mainMenu = false;
			multiplayer = true;
		} else if ((((canvas.width / 2) - 150 <= mx && mx <= ((canvas.width / 2) - 150) + 300 && (canvas.height / 3) + 100 <= my && my <= (canvas.height / 3) + 225))) {
			leaderboard = true;
			mainMenu = false;
		}
	} else if (leaderboard) {
		//if (mx)
	}
});

canvas.addEventListener('mousemove', function (ev) {
	var moveX = ev.offsetX;
	var moveY = ev.offsetY;
	if ((canvas.width / 2) - 150 <= moveX && moveX <= ((canvas.width / 2) - 150) + 300 && (canvas.height / 3) + 25 <= moveY && moveY <= (canvas.height / 3) + 75) {
		opacity.sp = '60';
	} else {
		opacity.sp = '00';
	}

	if (((canvas.width / 2) - 150 <= moveX && moveX <= ((canvas.width / 2) - 150) + 300 && (canvas.height / 3) + 100 <= moveY && moveY <= (canvas.height / 3) + 150)) {
		opacity.mp = '60';
	} else {
		opacity.mp = '00';
	}

	if (((canvas.width / 2) - 150 <= moveX && moveX <= ((canvas.width / 2) - 150) + 300 && (canvas.height / 3) + 175 <= moveY && moveY <= (canvas.height / 3) + 225)) {
		opacity.lb = '60';
	} else {
		opacity.lb = '00';
	}
});

canvas.addEventListener('keydown', keyboard);

function update() {
	if (mainMenu || leaderboard) {
		randomControls();
		wrappingCollision();
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = bgColour;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	if (!mainMenu && !leaderboard) {
		ctx.fillStyle = themes[currentTheme % themes.length].snake + '60';
		ctx.font = (100 + score + 'px Arial');
		ctx.textAlign = 'right';
		ctx.fillText(score, canvas.width - 10, canvas.height - 15);
	}

	// if (mainMenu) {
	// 	ctx.fillStyle = themes[currentTheme % themes.length].snake + '60';
	// 	ctx.strokeStyle = themes[currentTheme % themes.length].snake + '60';
	// 	ctx.lineWidth = '3px';
	// 	ctx.strokeRect(canvas.width-180,10,170,200);

	// 	ctx.font = ('20px Arial');
	// 	ctx.textAlign = 'left';
	// 	ctx.fillText('1 : James',canvas.width-170,40);
	// 	ctx.fillText('2 : Mike',canvas.width-170,70);
	// 	ctx.fillText('3 : Moorad',canvas.width-170,100);
	// 	ctx.fillText('4 : Sam',canvas.width-170,130);
	// 	ctx.fillText('5 : John',canvas.width-170,160);
	// }
	for (var i = 0; i < snake.length; i++) {
		ctx.fillStyle = (snake[i].col) ? snake[i].col : snakeColour;
		ctx.fillRect(snake[i].x, snake[i].y, size, size);
	}

	if (multiplayer) {
		// if (user) {
		// 	input.style.display = 'initial';
		// 	canvas.removeEventListener('keydown',keyboard,true);

		//} else {
		if (score > oscore && multiplier <= 1 && score >= mMLeaderboard.scores[9]) {
			socket.emit('scores', {score:score,name:name});
			console.log('Sent : '+score);
			oscore = score;
		}
		size = 36 / (1 + players.length);
		for (var e = 0; e < players.length; e++) {
			for (var d = 0; d < players[e].length; d++) {
				ctx.fillRect(players[e][d].x, players[e][d].y, size, size);
			}
		}
		//}
	} else if (!multiplayer) {
		size = 36;
	}
	if (food.random == 49 || food.random == 68) {
		ctx.fillStyle = '#ed5017';
	} else if (food.random % 10 == 0) {
		ctx.fillStyle = '#edcc17';
	} else {
		ctx.fillStyle = '#17ed77';
	}
	ctx.fillRect(food.x, food.y, size, size);
	var oldSnakeX = snake[0].x;
	var oldSnakeY = snake[0].y;
	if ((oldSnakeX == food.x && oldSnakeY == food.y) || multiplier > 1) {
		multiplier--;
		if ((oldSnakeX == food.x && oldSnakeY == food.y)) {
			if (food.random == 49 || food.random == 68) {
				multiplier = 12;
			} else if (food.random % 10 == 0) {
				multiplier = 7;
			} else {
				multiplier = 3;
			}
			food.x = Math.floor(Math.random() * (canvas.width / size)) * size;
			food.y = Math.floor(Math.random() * (canvas.height / size)) * size;
		}
		food.random = Math.floor(Math.random() * 100);
		//snake.slice(3-multiplier)[0].col = snakeColour + '60';
		score++;
	} else {
		snake.pop();
	}

	if (dir == 'up') {
		oldSnakeY -= size;
	} else if (dir == 'down') {
		oldSnakeY += size;
	} else if (dir == 'left') {
		oldSnakeX -= size;
	} else if (dir == 'right') {
		oldSnakeX += size;
	}

	snake.unshift({
		x: oldSnakeX,
		y: oldSnakeY
	});


	if (!mainMenu && !leaderboard) {
		collision();
	}

	if (multiplayer && dir != 'none') {
		sendCoord(snake);
	}

	if (mainMenu) {
		ctx.drawImage(logo, (canvas.width / 2) - (576 / 2), (canvas.height / 4) - (324 / 2), 576, 324);
		ctx.fillStyle = '#FFFFFF' + opacity.sp;
		ctx.lineWidth = 4;
		ctx.strokeStyle = '#FFFFFF';
		ctx.strokeRect((canvas.width / 2) - 150, (canvas.height / 3) + 25, 300, 50);
		ctx.fillRect((canvas.width / 2) - 150, (canvas.height / 3) + 25, 300, 50);
		ctx.fillStyle = '#FFFFFF' + opacity.mp;
		ctx.strokeRect((canvas.width / 2) - 150, (canvas.height / 3) + 100, 300, 50);
		ctx.fillRect((canvas.width / 2) - 150, (canvas.height / 3) + 100, 300, 50);
		ctx.fillStyle = '#FFFFFF' + opacity.lb;
		ctx.strokeRect((canvas.width / 2) - 150, (canvas.height / 3) + 175, 300, 50);
		ctx.fillRect((canvas.width / 2) - 150, (canvas.height / 3) + 175, 300, 50);
		ctx.fillStyle = '#ffffff';
		ctx.font = '30px Arial';
		ctx.textAlign = 'center';
		ctx.fillText('Singleplayer', (canvas.width / 2), (canvas.height / 3) + 60);
		ctx.fillText('Multiplayer', (canvas.width / 2), (canvas.height / 3) + 135);
		ctx.fillText('Leaderboard', (canvas.width / 2), (canvas.height / 3) + 210);
	} else if (leaderboard) {
		ctx.fillStyle = 'white';
		ctx.font = '30px Arial';
		ctx.textAlign = 'center';
		ctx.fillText('Highest People Ever!',(canvas.width / 2), (canvas.height / 3) - 150);
		ctx.textAlign = 'left';
		
		for (var x = 0;x < mMLeaderboard.scores.length;x ++) {
			ctx.fillText(`${x+1}.${mMLeaderboard.names[x]}`,(canvas.width / 2) - 200, (canvas.height / 3) + (x-2)*50);
			ctx.fillText(mMLeaderboard.scores[x],(canvas.width / 2) + 100, (canvas.height / 3) + (x-2)*50);
		}
	}
}

function theme(index) {
	bgColour = themes[index].bg;
	snakeColour = themes[index].snake;
}

function randomControls() {
	var control = Math.floor(Math.random() * 25);
	if (control == 0 && !(dir == 'down')) {
		dir = 'up';
	} else if (control == 1 && !(dir == 'up')) {
		dir = 'down';
	} else if (control == 2 && !(dir == 'right')) {
		dir = 'left';
	} else if (control == 3 && !(dir == 'left')) {
		dir = 'right';
	}
}

function restart() {
	snake = [{
		x: 144,
		y: 144
	}];
	food = {
		x: Math.floor(Math.random() * (canvas.width / size)) * size,
		y: Math.floor(Math.random() * (canvas.height / size)) * size
	};
	dir = 'none';
	score = 0;
	score = 0;
	multiplier = 0;
}

function wrappingCollision() {
	for (var e = 0; e < snake.length; e++) {
		if (snake[e].x < 0) {
			snake[e].x = canvas.width - size;
		}
		if (snake[e].x > canvas.height) {
			snake[e].x = 0;
		}
		if (snake[e].y < 0) {
			snake[e].y = canvas.height - size;
		}
		if (snake[e].y > canvas.height) {
			snake[e].y = 0;
		}
	}
}

function collision() {
	if (snake[0].x < 0 || snake[0].x + size > canvas.width || snake[0].y < 0 || snake[0].y + size > canvas.height) {
		restart();
	}
	if (snake.length > 1) {
		for (var l = 1; l < snake.length; l++) {
			if (snake[0].x == snake[l].x && snake[0].y == snake[l].y) {
				restart();
			}
		}
	}
}

function sendCoord(data) {
	socket.emit('players', data);
}

function processPlayer(data) {
	var playerExists = false;
	var index;
	for (var g = 0; g < players.length; g++) {
		if (data[-1] == players[g][-1]) {
			playerExists = true;
			index = g;
			break;
		}
	}

	if (playerExists) {
		players[index] = data;
	} else {
		players.push(data);
	}
}

socket.on('players', function (data) {
	processPlayer(data);
});

socket.on('delPlayer', function (data) {
	for (var o = 0; o < players.length; o++) {
		if (players[o][1] == data) {
			players.splice(o, 1);
			break;
		}
	}
});

socket.on('scores', function (data) {
	mMLeaderboard.scores = data.scores;
	mMLeaderboard.names = data.names;
	console.log(data)
});

var keyboard = (e) => {
	console.log('Keys')
	if (!mainMenu && !user) {
		if (e.keyCode == 38 && !(dir == 'down')) {
			dir = 'up';
		} else if (e.keyCode == 40 && !(dir == 'up')) {
			dir = 'down';
		} else if (e.keyCode == 37 && !(dir == 'right')) {
			dir = 'left';
		} else if (e.keyCode == 39 && !(dir == 'left')) {
			dir = 'right';
		} else if (e.keyCode == 27) {
			mainMenu = true;
			leaderboard = false;
			multiplayer = false;
			user = true;
			snake = [{
				x: 144,
				y: 144,
			}, {
				x: 144,
				y: 170
			}, {
				x: 170,
				y: 170
			}, {
				x: 170,
				y: 204
			}, {
				x: 170,
				y: 238
			}];
		}
	}
	if (e.keyCode == 84) {
		currentTheme++;
		theme(currentTheme % themes.length);
	}
}
