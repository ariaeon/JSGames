const canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

export const ball = {
	x: canvas.width / 2 - 5,
	y: canvas.height - 50,
	dx:1,
	dy:1,
	v:3,
	radius: 10,
	draw: function() {
		// console.log(this.x, this.y);
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();

		this.x += this.dx * this.v;
		this.y += this.dy * this.v;
	},
};