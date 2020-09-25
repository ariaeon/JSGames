import { snake } from './snake.js';
import { food } from './food.js';

export const canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
export const ctx = canvas.getContext('2d');
document.addEventListener('keydown', logKey);
document.getElementById('speed').addEventListener('change', (e) => 	{
	speed = e.target.value;
	console.log(speed);
});
document.getElementById('scaling').addEventListener('change', (e) => 	{
	scl = 10 * 2 ** parseInt(e.target.value);
	console.log(scl);
	cols = (canvas.width / scl).toFixed(0);
	rows = (canvas.height / scl).toFixed(0);

	food.spawn(cols, rows);

});

export let scl = 10 * 2 ** parseInt(document.getElementById('scaling').value);
export let cols = (canvas.width / scl).toFixed(0);
export let rows = (canvas.height / scl).toFixed(0);

// console.log(cols, rows);
let score = 0;
let speed = document.getElementById('speed').value;

function logKey(e) {
	switch (e.code) {
	case 'ArrowRight':
		snake.dx = snake.dx == -1 ? -1 : 1;
		snake.dy = 0;
		break;
	case 'ArrowLeft':
		snake.dx = snake.dx == 1 ? 1 : -1;
		snake.dy = 0;
		break;
	case 'ArrowUp':
		snake.dx = 0;
		snake.dy = snake.dy == 1 ? 1 : -1;
		break;
	case 'ArrowDown':
		snake.dx = 0;
		snake.dy = snake.dy == -1 ? -1 : 1;
		break;
	}
}
function drawGrid() {
	let x = 0.5;
	let y = 0.5;
	while(x < canvas.width) {
		drawLine(x, 0);
		x += scl;
	}
	while(y < canvas.height) {
		drawLine(0, y);
		y += scl;
	}
}
function drawLine(x, y) {
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'white';
	ctx.beginPath();
	ctx.moveTo(x, y);
	x == 0 ? ctx.lineTo(canvas.width, y) : ctx.lineTo(x, canvas.height);
	ctx.closePath();
	ctx.stroke();
}
function checkCollision() {
	let collision = false;
	snake.tail.forEach(e => {
		if(e[0] === snake.x && e[1] === snake.y) {
			collision = true;
		}
	});
	return collision;
}
function checkFood() {
	if(food.x == snake.x && food.y == snake.y) {
		score += 5;
		food.spawn(cols, rows);
		snake.eat();
		console.log(`Score: ${score}`);
	}
}
function reset() {
	score = 0;
	snake.tail = [];
}

drawGrid();
food.spawn(cols, rows);
snake.draw();

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawGrid();
	food.draw();
	snake.move();
	if(checkCollision()) {
		// ctx.fillStyle = 'black';
		// ctx.fillRect(0, 0, canvas.width, canvas.height);

		// TODO GAME OVER
		reset();
	}
	checkFood();

	// console.log(snake.tail);
	if(snake.tail.length) {
		snake.drawtail();
	}
	setTimeout(draw, 1050 - speed * 100);
}

setTimeout(draw, 1050 - speed * 100);
