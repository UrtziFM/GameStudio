let game = new Game();

window.gui = new Gui(game);

window.onload = function() {
    console.log("loading...");
    window.gui.load([
        {id: "player-img", var: playerImg = document.createElement("img"), file: "assets/player1.png" },
        {id: "asteroid-img", var: asteroidImg =  document.createElement("img"), file: "assets/first.png" }, 
        {id: "asteroid-large", var: asteroidLargeImg =  document.createElement("img"), file: "assets/first_large.png" },
        {id: "asteroid-small", var: asteroidSmallImg =  document.createElement("img"), file: "assets/first_small.png" },
        {id: "laser-audio", var: laserAudio = document.createElement("audio"), file: "assets/Laser.mp3" }, 
        {id: "boom-audio", var: boomAudio = document.createElement("audio"), file: "assets/Boom.mp3" }
    ]);
}
window.onresize = function() {
    console.log("resizing...");
    window.gui.resize();
}