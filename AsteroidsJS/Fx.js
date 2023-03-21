class Fx {

    constructor() {
        this.cnv = null;
        this.ctx = null;
        this.time = null;
    }

    init() {
        this.cnv = document.getElementById("canvas");
        this.ctx = this.cnv.getContext("2d");
        this.time = 3000;
    }

    fillCanvas(color) {
        this.drawRect(0,0, this.cnv.width,this.cnv.height, color);
    }

    drawRect(x,y, width,height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y, width,height);
        this.ctx.fill();
    }

    drawCircle(x,y, size, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x,y, size, 0, Math.PI*2);
        this.ctx.fill();
    }

    rotateAndDrawImage(image, atx,aty, angle) {
        if ( image && this.ctx ) {
            this.ctx.save();
            this.ctx.translate(atx+image.width/2, aty+image.height/2);
            this.ctx.rotate(angle);
            this.ctx.drawImage(image, -image.width/2,-image.height/2);
            this.ctx.restore();
        }
    }

    survivalTime(){
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "WHITE";
        this.ctx.fillText("Survival Time: "+this.time, this.cnv.width/40, this.cnv.height/20); 
        this.time--;
        if (this.time == 0){
            window.gui.winGame();
            return;
            }
    }
}