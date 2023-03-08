// Calling to class Gui
let game = new Game();

window.gui = new Gui(game);

window.onload = function() {
    console.log("loading...");
    window.gui.load([
        {id: "gameOn", var: playerImg = document.createElement("img"), file: "Assets/gameOnPong.png" },
        {id: "gameOver", var: asteroidImg =  document.createElement("img"), file: "Assets/gameOverPong.jpeg" }
    ]);
}

window.onresize = function(){
    console.log("resizing...");
    window.gui.resize();
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
function gameOn() {
    render();
    update();
}

// Number of frames per second
let framePerSecond = 50;

// call the funcyion 50 times every 1 sec
let loop = setInterval(gameOn, 1000/framePerSecond);