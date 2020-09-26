/** @type {CanvasRenderingContext2D} */
import { scl, cols, rows, ctx } from './index.js';
let loop = document.getElementById('success-outlined').checked ? true : false;
document.getElementById('success-outlined').addEventListener('change', (e) => 	{
	loop = e.target.checked;
	console.log(loop);
});
document.getElementById('danger-outlined').addEventListener('change', () => 	{
	loop = false;
	console.log(loop);
});


export const snake = {
	x : 0,
	y : 0,
	dx : 1,
	dy : 0,
	tail : [],
	draw : function() {
		ctx.fillStyle = 'black';
		this.x = Math.floor(Math.random() * rows);
		this.y = Math.floor(Math.random() * cols);

		ctx.fillRect(this.x * scl + 1, this.y * scl + 1, scl - 1, scl + -1) ;
	},
	move : function() {
		this.x += this.dx;
		this.y += this.dy;

		if(this.x < 0) {
			loop ? this.x = cols - 1 : this.reset();
		}
		else if(this.x >= cols) {
			loop ? this.x = 0 : this.reset();

		}
		if(this.y < 0) {
			loop ? this.y = (rows - 1) : this.reset();

		}
		else if(this.y >= rows) {
			loop ? this.y = -0 : this.reset();

		}


		ctx.fillStyle = 'black';
		ctx.fillRect(this.x * scl + 1, this.y * scl + 1, scl - 1, scl + -1) ;
		console.log(this.x, this.y);

	},
	eat : function() {
		this.tail.push([this.x, this.y]);
	},
	drawtail : function() {
		// draws tail
		this.tail.forEach(block => {
			ctx.fillRect(block[0] * scl + 1, block[1] * scl + 1, scl - 1, scl + -1) ;
		},
		);

		// on each update remove last and add next
		this.tail.push([this.x, this.y]);
		this.tail.shift();
	},
	reset : function() {
		this.draw();
		this.tail = [];
	},
};
