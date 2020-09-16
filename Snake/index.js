import { snake } from './snake.js';
import { food } from './food.js';

const canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
document.addEventListener('keydown', logKey);

const scl = 20;
const cols = canvas.width / scl;
const rows = canvas.height / scl;
let score = 0;

function logKey(e) {
	switch (e.code) {
	case 'ArrowRight':
		snake.dx = 1;
		snake.dy = 0;
		break;
	case 'ArrowLeft':
		snake.dx = -1;
		snake.dy = 0;
		break;
	case 'ArrowUp':
		snake.dx = 0;
		snake.dy = -1;
		break;
	case 'ArrowDown':
		snake.dx = 0;
		snake.dy = 1;
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

food.spawn(cols, rows);

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
	food.draw();
	snake.update();

	snake.tail.forEach(e => {
		if(e[0] === snake.x && e[1] === snake.y) {
			console.log('collision');
			snake.tail = [];
		}
	});

	if(food.x == snake.x && food.y == snake.y) {
		score += 5;
		food.spawn(cols, rows);
		snake.eat();
		console.log(`Score: ${score}`);
	}

	if(!snake.tail.length) return;
	// console.log(`${snake.x} , ${snake.y}`);
	// console.log(`${snake.tail[0][0]} , ${snake.tail[0][1]}`);


	snake.drawtail();

}

setInterval(draw, 250);