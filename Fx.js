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
            x: (cvs.width - 60)/2, //in the middle of the screen
            y: cvs.height - 30, // on the bottom of the screen
            width: 60,
            height: 10,
            color: "WHITE",
            score: 0
        }
        this.ball = {
            x: cvs.width/2,
            y: cvs.height/2,
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
        for(c=0; c<brickColumnCount; c++) {
            bricks[c] = [];
            for(r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
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
        for(c=0; c<this.brickColumnCount; c++) {
            for(r=0; r<this.brickRowCount; r++) {
                if(this.bricks[c][r].status == 1) {
                    this.brickX = (c*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
                    this.brickY = (r*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
                    this.bricks[c][r].x = this.brickX;
                    this.bricks[c][r].y = this.brickY;
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
        // update the score
        if(this.ball.x - this.ball.radius < 0){
        // the computer win
            this.computer.score++;
            this.resetBall();
        }else if(this.ball.x + this.ball.radius > this.cnv.width){
        // the user win
            this.user.score++;
            this.resetBall();
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

    
        if(this.collision()){

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