// Select Canvas
const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

// Create the user padle

const user = {
    x: 0,
    y: cvs.height/2 - 100/2,
    width = 10,
    height = 100,
    color = "WHITE",
    score = 0
}

// Create the computer padle

const computer = {
    x: cvs.width -  10,
    y: cvs.height/2 - 100/2,
    width = 10,
    height = 100,
    color = "WHITE",
    score = 0
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
    x: cvs.width/2 -1,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE"
}

// Draw the net function
function drawNet(){
    for (let i =0; i <=cvs.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// Draw rect function
function drawRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

// Draw circle function

function drawCircle(x,y,r,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}

// Draw text function

function drawText(text,x,y,color) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
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

// Game init function

function gameInit() {
    render();
}

// Loop 
const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);