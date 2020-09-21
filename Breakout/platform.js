const canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

export const platform = {
	width: 75,
	height: 10,
	x: (canvas.width / 2) - 25,
	y: canvas.height - 10,
	v:5,
	draw: function() {
		// console.log(this.x, this.y);
		ctx.fillStyle = 'black';
		ctx.fillRect(this.x, this.y, this.width, this.height);

	},
};