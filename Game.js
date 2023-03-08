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
        console.log("game update");
    }

    render() {
        this.fx.fillCanvas("black");
        this.fx.userScore();
        this.fx.computerScore();
        this.fx.drawNet();
        this.fx.drawBall();
        this.fx.userPaddle();
        this.fx.computerPaddle();
    }
}