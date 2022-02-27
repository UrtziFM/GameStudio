// Select Canvas
const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

// Create the user padle

const user = {
    x: 0, //left side of canvas
    y: (cvs.height - 100)/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}

// Create the computer padle

const computer = {
    x: cvs.width - 10, //right side of canvas
    y: (cvs.height - 100)/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}

// Create the  ball

const ball = {
    x: cvs.width/2,
    y: cvs.height/2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE"
}

// Create the net
const net = {
    x: (cvs.width - 2)/2, //in the middle of canvas
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE"
}

// Draw the net function to draw the net
function drawNet(){
    for (let i =0; i <=cvs.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// Draw rect function to draw paddles
function drawRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

// Draw circle function to draw ball

function drawCircle(x,y,r,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// Draw text function

function drawText(text,x,y,color) {
    ctx.fillStyle = color;
    ctx.font = "75px fantasy";
    ctx.fillText(text,x,y);
}

// Render the game function

function render() {
    // clear the canvas
    drawRect(0, 0, cvs.width, cvs.height, "BLACK");

    // draw the net
    drawNet();

    // draw the score 
    drawText(user.score,cvs.width/4,cvs.height/5, "WHITE");
    drawText(computer.score,3*cvs.width/4,cvs.height/5, "WHITE");

    // draw user and computer paddles
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);

    // draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// control the user paddles
function movePaddle(evt) {
    let rect = cvs.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height/2;
}
cvs.addEventListener("mousemove", movePaddle);

// colission detection
function collision(ball, player){
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.right = ball.x + ball.radius;
    ball.left = ball.x - ball.radius;

    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    return ball.right > player.left && ball.bottom > player.top && ball.left < player.right && ball.top < player.bottom;
}

// resetBall function
function resetBall() {
    ball.x = cvs.width/2;
    ball.y = cvs.height/2;

    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

// update: position, move, score...
function update() {

    // update the score
    if(ball.x - ball.radius < 0){
    // the computer win
        computer.score++;
        resetBall();
    }else if(ball.x + ball.radius > cvs.width){
    // the user win
        user.score++;
        resetBall();
    }

    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Simple AI to control the computer paddle
    let computerLevel = 0.1;
    computer.y += (ball.y - (computer.y + computer.height/2))*computerLevel;


    if(ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x + ball.radius < cvs.width/2) ? user : computer;

    if(collision(ball, player)){
        // where the ball hit the player
        let collidePoint = ball.y - (player.y + player.height/2);
        // normalization 
        collidePoint = collidePoint/(player.height/2);
        // calculate angle in Radians 
        let angleRad = collidePoint * (Math.PI/4);
        // X direction of the ball its hit 
        let direction = (ball.x + ball.radius < cvs.width/2) ? 1 : -1;

        //change velocity X and Y 
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = direction * ball.speed * Math.sin(angleRad);
        // every time the ball hit the paddle increase its speed
        ball.speed += 0.3;
    }

}
// Game init function
function game() {
    render();
    update();
}

// Number of frames per second
let framePerSecond = 50;

// call the funcyion 50 times every 1 sec
let loop = setInterval(game, 1000/framePerSecond);