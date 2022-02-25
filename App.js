// Select Canvas
const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

// Draw rect function
function drawRect(x,y,w,z,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,z);
}

drawRect(0, 0, cvs.width, cvs.height, "BLACK");