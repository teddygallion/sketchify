const colorPicker = document.getElementById("color");
const clearBtn = document.getElementById('clear-btn');
const lineWidthBtn = document.getElementById('line-width');
const mousePos = document.getElementById('mouse-position');


class DrawingApp {
	constructor(canvasId){
		this.canvas = document.getElementById(canvasId);
		this.context = this.canvas.getContext('2d');
		this.isDrawing = false;
		this.lastX = 0;
		this.lastY = 0;
		this.currentColor = '#000';
		this.lineWidth = 5;
		this.setup();
	}
	startDrawing(e) {
		this.isDrawing = true;
		 this.isDrawing = true;
	    this.context.beginPath();
	    this.context.moveTo(e.offsetX, e.offsetY);
	}
	draw(e){
		if(!this.isDrawing) return;
		this.context.lineTo(e.offsetX, e.offsetY);
		this.lineWidth = this.lineWidthValue;
	    this.context.strokeStyle = this.currentColor;
	    this.context.lineCap = 'round';
	    this.context.lineJoin = 'round';
	    this.context.stroke();	
	}
	stopDrawing(){
		this.isDrawing = false;
		this.context.closePath();
	}

	clearCanvas(e){
		e.preventDefault();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	changeColor(newColor){

		this.currentColor = newColor;
	}
	changeLineWidth(newLineWidth){
        this.lineWidth = newLineWidth;
        this.context.lineWidth = newLineWidth; // Update context's line width
    }

	setup(){
		this.canvas.addEventListener('mousemove', (e) => this.watchMouse(e));
		clearBtn.addEventListener('click', (e)=> this.clearCanvas(e));
		colorPicker.addEventListener('change', (e)=> this.changeColor(colorPicker.value));
		lineWidthBtn.addEventListener('input', (e) => this.changeLineWidth(parseInt(e.target.value)));
		this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
		this.canvas.addEventListener('mousemove', (e) => this.draw(e));
		this.canvas.addEventListener('mouseup', () => this.stopDrawing());
		this.canvas.addEventListener('mouseout', () => this.stopDrawing());
	}
}

const drawingApp = new DrawingApp('canvas');

function changeColor(color){
	drawingApp.changeColor(color);
}

function clearCanvas(){
	drawingApp.clearCanvas();
}