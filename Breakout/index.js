import { ball } from './ball.js';
import { platform } from './platform.js';
import { block } from './block.js';

const canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
let leftPressed, rightPressed = false;
const blocks = [];

// Tried following but would bug out when pressing 2 keys
// function logKey(e) {
// 	switch (e.code) {
// 	case 'ArrowLeft':
// 		leftPressed = !leftPressed;
// 		break;
// 	case 'ArrowRight':
// 		rightPressed = !rightPressed;
// 		break;

// 	}
// }

function keyDown(e) {
	switch (e.code) {
	case 'ArrowLeft':
		leftPressed = true;
		break;
	case 'ArrowRight':
		rightPressed = true;
		break;

	}
}
function keyUp(e) {
	switch (e.code) {
	case 'ArrowLeft':
		leftPressed = false;
		break;
	case 'ArrowRight':
		rightPressed = false;
		break;

	}
}
function initialiseBlocks() {
	const rows = 3;
	for(let r = 0; r < rows; r++) {
		for(let i = 0; i < canvas.width - 60 ; i += 73) {
			const x = i + 25;
			const y = r * 20 + 20;
			blocks.push(new block(x, y));
		}
	}
}
function detectCollisionPlatform() {
	// check height of ball so this doesnt run every frame
	if((ball.y + (ball.radius)) >= platform.y && (ball.y + (ball.radius)) < canvas.height) {
		if(ball.x >= platform.x && ball.x <= platform.x + platform.width) {
			ball.dy = -1;
		}
	}
}
function detectCollisionBorders() {
	if((ball.x - ball.radius) <= 0 || (ball.x + ball.radius) >= canvas.width) {
		ball.dx = ball.dx == 1 ? -1 : 1;
	}
	if((ball.y - ball.radius) <= 0) {
		ball.dy = ball.dy == 1 ? -1 : 1;
	}
	else if ((ball.y) >= canvas.height) {
		console.log('udedlol');
		resetGame();
	}
}
function RectCircleColliding(circle, rect) {
	const distX = Math.abs(circle.x - rect.x - rect.width / 2);
	const distY = Math.abs(circle.y - rect.y - rect.height / 2);

	if (distX > (rect.width / 2 + circle.radius)) { return false; }
	if (distY > (rect.height / 2 + circle.radius)) { return false; }

	if (distX <= (rect.width / 2)) { return true; }
	if (distY <= (rect.height / 2)) { return true; }

	const dx = distX - rect.width / 2;
	const dy = distY - rect.height / 2;
	return (dx * dx + dy * dy <= (circle.radius * circle.radius));
}

function detectCollisionBlocks() {
	blocks.forEach(b => {
		if(b.visible) {
			// stolen this shit hard
			if(RectCircleColliding(ball, b)) {
				b.visible = false;
				// center hits bottom
				if(ball.x >= b.x && ball.x <= b.x + b.width) {
					ball.dy = ball.dy == 1 ? -1 : 1;
				}
				else if(ball.y > b.y && ball.y < b.y + b.height) {
					ball.dx = ball.dx == 1 ? -1 : 1;
				}
				else {
					ball.dx = ball.dx == 1 ? -1 : 1;
					ball.dy = ball.dy == 1 ? -1 : 1;

				}
			}

		}
	});

}
function resetGame() {
	blocks.forEach(b => b.visible = true);
	ball.x = Math.random() * (canvas.width - 0) + 0;
	ball.y = canvas.height - 200;
}

initialiseBlocks();

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	detectCollisionPlatform();
	detectCollisionBorders();
	detectCollisionBlocks();
	ball.draw();
	blocks.forEach(b => b.visible ? b.draw() : '');
	if (leftPressed) {
		if (platform.x > 0) {
			platform.x -= platform.v;
		}
	}

	if(rightPressed) {
		if (platform.x + platform.width < canvas.width) {
			platform.x += platform.v;
		}
	}
	platform.draw();

}

setInterval(draw, 10);
