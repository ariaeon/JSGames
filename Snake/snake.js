/** @type {CanvasRenderingContext2D} */
import { scl, cols, rows, ctx } from './index.js';

export const snake = {
	x : 0,
	y : 0,
	dx : 1,
	dy : 0,
	tail : [],
	draw : function() {
		ctx.fillStyle = 'black';
		ctx.fillRect(this.x * scl + 1, this.y * scl + 1, scl - 1, scl + -1) ;
	},
	move : function() {
		this.x += this.dx;
		this.y += this.dy;

		if(this.x < 0) {
			this.x = cols - 1;
		}
		else if(this.x >= cols) {
			this.x = 0;
		}
		if(this.y < 0) {
			this.y = (rows - 1);
		}
		else if(this.y >= rows) {
			this.y = -0;
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
};
