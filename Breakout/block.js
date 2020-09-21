const canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

export function block(x, y) {
	this.width = 60,
	this.height = 10,
	this.x = x,
	this.y = y,
	this.visible = true,
	this.draw = function() {
		// console.log(this.x, this.y);
		ctx.fillStyle = 'black';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
}