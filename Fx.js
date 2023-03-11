class Fx {

    constructor(){
        this.cnv = null;
        this.ctx = null;
        this.user = null;
        this.ball = null;
        this.brickRowCount = null;
        this.brickColumnCount = null;
        this.brickWidth = null;
        this.brickHeight = null;
        this.brickPadding = null;
        this.brickOffsetTop = null;
        this.brickOffsetLeft = null;
        this.bricks = [];
        this.score = null;
    }

    init(){
        this.cnv = document.getElementById("canvas");
        this.ctx = this.cnv.getContext("2d");
        window.addEventListener("mousemove", (e)=> {this.movePaddle(e)});
        this.user = {
            x: (this.cnv.width - 60)/2, //in the middle of the screen
            y: this.cnv.height - 30, // on the bottom of the screen
            width: 60,
            height: 10,
            color: "WHITE",
            score: 0
        }
        this.ball = {
            x: this.cnv.width/2,
            y: this.cnv.height/2,
            radius: 6,
            speed: 5,
            velocityX: 5,
            velocityY: 5,
            color: "WHITE"
        }
        this.brickRowCount = 4;
        this.brickColumnCount = 10;
        this.brickWidth = 50;
        this.brickHeight = 20;
        this.brickPadding = 5;
        this.brickOffsetTop = 15;
        this.brickOffsetLeft = 25;
        // The matrix for bricks
        this.bricks = [];
        for(this.c=0; this.c<this.brickColumnCount; this.c++) {
            this.bricks[this.c] = [];
            for(this.r=0; this.r<this.brickRowCount; this.r++) {
                this.bricks[this.c][this.r] = { x: 0, y: 0, status: 1 };
            }
        }
        this.score = 0;
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

    movePaddle(e) {
        this.rect = this.cnv.getBoundingClientRect();
    
        this.user.x = e.clientX - this.rect.top - this.user.width/2;
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

    userScore(){
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "WHITE";
        this.ctx.fillText("Score: "+this.score, 2, 395);
        if(this.user.score == 3){
            window.gui.winGame();
            return;
        }
    }

    // Draw the bricks (C: Col R: Row )
    drawBricks() {
        for(this.c=0; this.c<this.brickColumnCount; this.c++) {
            for(this.r=0; this.r<this.brickRowCount; this.r++) {
                if(this.bricks[this.c][this.r].status == 1) {
                    this.brickX = (this.c*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
                    this.brickY = (this.r*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
                    this.bricks[this.c][this.r].x = this.brickX;
                    this.bricks[this.c][this.r].y = this.brickY;
                    this.ctx.beginPath();
                    this.ctx.rect(this.brickX, this.brickY, this.brickWidth, this.brickHeight);
                    this.ctx.fillStyle = "WHITE";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }

    collision(ball, user){
        ball = this.ball;
        user = this.user;
        
        this.ball.top = this.ball.y - this.ball.radius;
        this.ball.bottom = this.ball.y + this.ball.radius;
        this.ball.right = this.ball.x + this.ball.radius;
        this.ball.left = this.ball.x - this.ball.radius;
    
        this.user.top = this.user.y;
        this.user.bottom = this.user.y + this.user.height;
        this.user.left = this.user.x;
        this.user.right = this.user.x + this.user.width;
    
        return this.ball.right > this.user.left && this.ball.bottom > this.user.top && this.ball.left < this.user.right; 
    }
// take from here

    updateGame(){   
       
    
        // the ball has a velocity
        this.ball.x += this.ball.velocityX;
        this.ball.y += this.ball.velocityY;
    
       
    }
}