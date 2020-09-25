/** @type {CanvasRenderingContext2D} */
import { scl, ctx } from './index.js';

export const food = {
	x : 0,
	y : 0,
	spawn : function(r, c) {
		console.log('spawn');
		this.x = Math.floor(Math.random() * r);
		this.y = Math.floor(Math.random() * c);
	},
	draw : function() {
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x * scl + 1, this.y * scl + 1, scl - 1, scl + -1) ;

	},
};