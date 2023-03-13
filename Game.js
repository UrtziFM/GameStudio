class Game {

    constructor() {
        this.fx  = new Fx();
    }

    init() {
        this.fx.init();
    }

    resize() {
        console.log("game resize");
    }

    update() {
        this.fx.updateGame();
    }

    render() {
        this.fx.fillCanvas("black");
        this.fx.userScore();
        this.fx.drawBall();
        this.fx.userPaddle();
        this.fx.drawBricks();
        this.fx.collisionDetection();
    }
}