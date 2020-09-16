const canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
const scl = 20;

export const snake = {
	x : 10,
	y : 10,
	dx : 1,
	dy : 0,
	tail : [],
	move : function() {
		this.x += this.dx;
		this.y += this.dy;

		ctx.fillStyle = 'black';
		ctx.fillRect(this.x * scl + 1, this.y * scl + 1, scl - 1, scl + -1) ;


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