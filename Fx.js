class Fx {

    constructor(){
        this.cnv = null;
        this.ctx = null;
        this.user = null;
        this.computer = null;
        this.net = null;
        this.ball = null;
        this.player = null;
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
        this.player = (this.ball.x + this.ball.radius < this.cnv.width/2) ? this.user : this.computer;
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

    collision(ball, player){
        this.ball.top = this.ball.y - this.ball.radius;
        this.ball.bottom = this.ball.y + this.ball.radius;
        this.ball.right = this.ball.x + this.ball.radius;
        this.ball.left = this.ball.x - this.ball.radius;
    
        this.player.top = this.player.y;
        this.player.bottom = this.player.y + this.player.height;
        this.player.left = this.player.x;
        this.player.right = this.player.x + this.player.width;
    
        return this.ball.right > this.player.left && this.ball.bottom > this.player.top && this.ball.left < 
        this.player.right && this.ball.top < this.player.bottom;
    }

    resetBall() {
        this.ball.x = this.cnv.width/2;
        this.ball.y = this.cnv.height/2;
    
        this.ball.speed = 5;
        this.ball.velocityX = -this.ball.velocityX;
    }

    updateGame(){   
        // update the score
        if(this.ball.x - this.ball.radius < 0){
        // the computer win
            this.computer.score++;
            this.fx.resetBall();
        }else if(this.ball.x + this.ball.radius > this.cnv.width){
        // the user win
            this.user.score++;
            this.fx.resetBall();
        }
    
        // the ball has a velocity
        this.ball.x += this.ball.velocityX;
        this.ball.y += this.ball.velocityY;
    
        // Simple AI to control the computer paddle
        this.computerLevel = 0.1;
        this.computer.y += (this.ball.y - (this.computer.y + this.computer.height/2))*this.computerLevel;
    
    
        if(this.ball.y + this.ball.radius > this.cnv.height || this.ball.y - this.ball.radius < 0){
            this.ball.velocityY = -this.ball.velocityY;
        }

    
        if(this.fx.collision(ball, player)){
            // where the ball hit the player
            this.collidePoint = this.ball.y - (this.player.y + this.player.height/2);
            // normalization 
            this.collidePoint = this.collidePoint/(this.player.height/2);
            // calculate angle in Radians 
            this.angleRad = this.collidePoint * (Math.PI/4);
            // X direction of the ball its hit 
            this.direction = (this.ball.x + this.ball.radius < this.cnv.width/2) ? 1 : -1;
    
            //change velocity X and Y 
            this.ball.velocityX = this.direction * this.ball.speed * Math.cos(this.angleRad);
            this.ball.velocityY = this.direction * this.ball.speed * Math.sin(this.angleRad);
            // every time the ball hit the paddle increase its speed
            this.ball.speed += 0.3;
        }
    }
}