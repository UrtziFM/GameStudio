class Fx {

    constructor(){
        this.cnv = null;
        this.ctx = null;
        this.user = null;
        this.computer = null;
        this.net = null;
        this.ball = null;
    }

    init(){
        this.cnv = document.getElementById("canvas");
        this.ctx = this.cnv.getContext("2d");
        this.user = {
            x: 0, //left side of canvas
            y: (this.cnv.height - 100)/2,
            width: 15,
            height: 100,
            color: "WHITE",
            score: 0
        }
        this.computer = {
            x: this.cnv.width - 15, //right side of canvas
            y: (this.cnv.height - 100)/2,
            width: 15,
            height: 100,
            color: "WHITE",
            score: 0
        }
        this.net = {
            x: (this.cnv.width - 2)/2, //in the middle of canvas
            y: 0,
            width: 2,
            height: 10,
            color: "WHITE"
        }
        this.ball = {
            x: this.cnv.width/2,
            y: this.cnv.height/2,
            radius: 15,
            speed: 5,
            velocityX: 5,
            velocityY: 5,
            color: "WHITE"
        }
    }

    fillCanvas(color){
        this.drawRect(0, 0, this.cnv.width, this.cnv.height, color);
    }

    drawRect(x, y, width, height, color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.fill();
    }

    userPaddle(){
        this.drawRect(this.user.x, this.user.y, this.user.width, this.user.height, this.user.color);
    }

    computerPaddle(){
        this.drawRect(this.computer.x, this.computer.y, this.computer.width, this.computer.height, this.computer.color);
    }

    drawCircle(x,y,r,color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x,y,r,0,Math.PI*2,true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawBall() {
        this.drawCircle(this.ball.x, this.ball.y, this.ball.radius, this.ball.color);
    }

    drawText(text,x,y,color) {
        this.ctx.fillStyle = color;
        this.ctx.font = "100px fantasy";
        this.ctx.fillText(text,x,y);
    }

    userScore(){
        this.drawText(this.user.score,this.cnv.width/3,this.cnv.height/8, "WHITE");
    }

    computerScore(){
        this.drawText(this.computer.score,1.85*this.cnv.width/3,this.cnv.height/8, "WHITE");
    }

    drawNet(){
        for (let i =0; i <=this.cnv.height; i+=15){
            this.drawRect(this.net.x, this.net.y + i, this.net.width, this.net.height, this.net.color);
        }
    }

    rotateAndDrawImage(image, atx, aty, angle){
        if(image && this.ctx){
            this.ctx.save();
            this.ctx.translate(atx+image.width/2, aty+image.height/2);
            this.ctx.rotate(angle);
            this.ctx.drawImage(image, -image.width/2, image.height/2);
            this.ctx.restore();
        }
    }
}