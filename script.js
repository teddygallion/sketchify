const colorPicker = document.getElementById("color");
const clearBtn = document.getElementById('clear-btn');



class DrawingApp {
	constructor(canvasId){
		this.canvas = document.getElementById(canvasId);
		this.context = this.canvas.getContext('2d');
		this.isDrawing = false;
		this.lastX = 0;
		this.lastY = 0;
		this.currentColor = '#000';

		this.setup();
	}
	startDrawing(e) {
		this.isDrawing = true;
		[this.lastX, this.lastY] = [e.offsetX, e.offsetY];
	}
	draw(e){
		if(!this.isDrawing) return;
		this.context.strokeStyle = this.currentColor;
		this.context.lineCap = 'round';
		this.context.lineJoin = 'round';
		this.context.lineWidth = 5;

		this.context.beginPath();
		this.context.moveTo(this.lastX, this.lastY);
		this.context.lineTo(e.offsetX, e.offsetY);

		this.context.stroke();

		[this.lastX, this.lastY] = [e.offsetX, e.offsetY];
	}
	stopDrawing(){
		this.isDrawing = false;
	}
	clearCanvas(e){
		e.preventDefault();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	changeColor(newColor){
		this.currentColor = newColor;
	}


	setup(){
		clearBtn.addEventListener('click', (e)=> this.clearCanvas(e));
		colorPicker.addEventListener('change', (e)=> this.changeColor(colorPicker.value));
		this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
		this.canvas.addEventListener('mousemove', (e) => this.draw(e));
		this.canvas.addEventListener('mouseup', () => this.stopDrawing());
		this.canvas.addEventListener('mouseout', () => this.stopDrawing());
	}
}
const drawingApp = new DrawingApp('myCanvas');

function changeColor(color){
	drawingApp.changeColor(color);
}

function clearCanvas(){
	drawingApp.clearCanvas();
}


