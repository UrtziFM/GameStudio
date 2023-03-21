class Player {

    constructor(particles) {
        this.fx = new Fx();
        this.keyHandler = new KeyHandler();
        this.projectileService = new ProjectileService(this);
        this.particles = particles;
        this.img = null;
        this.laserSound = null;
        this.boom = null;

        this.turnSpeed = 5;
        this.acceleration = 5;
        this.friction = 0.99;

        this.x = 0;
        this.y = 0;
        this.thrust = { x:0, y:0 };
        this.angle = 0;
        this.rotation = 0;
        this.reload = 10;
        this.frames = 0;

        this.alive = 1;
        this.dying = 2;
        this.dead = 3;
        this.state = this.alive;
        this.dyingTime = 240;
    }

    init() {
        this.fx.init();
        this.projectileService.init();
        this.keyHandler.init();
        this.img = window.gui.getResource("player-img");
        this.laserSound = window.gui.getResource("laser-audio");
        this.boom = window.gui.getResource("boom-audio");

        this.x = this.fx.cnv.width/2 - this.img.width/2;
        this.y = this.fx.cnv.height/2 - this.img.height/2;
        this.thrust = { x:0, y:0 };
        this.angle = 270/180*Math.PI;
        this.rotation = 0;
        this.reload = 10;
        this.frames = 0;

        this.state = this.alive;
        this.dyingTime = 240;
    }

    update() {

        if ( this.state == this.dead ) {
            window.gui.stopGame();
            return;
        }
        if ( this.state == this.dying ) {
            this.dyingTime--;
            this.state = ( this.dyingTime > 0 ) ? this.dying : this.dead;
            return;
        }

        this.frames++;
        this.rotation = 0;
        this.thrust.x = this.thrust.x * this.friction;
        this.thrust.y = this.thrust.y * this.friction;

        if ( this.x > this.fx.cnv.width ) {
            this.x = 0 - this.img.width/2;
        }
        if ( this.x + this.img.width < 0 ) {
            this.x = this.fx.cnv.width;
        }
        if ( this.y > this.fx.cnv.height ) {
            this.y = 0;
        }
        if ( this.y + this.img.height < 0 ) {
            this.y = this.fx.cnv.height;
        }

        if ( this.keyHandler.keys.indexOf("ArrowUp") > -1 ) {
            this.thrust.x = this.acceleration * Math.cos(this.angle);
            this.thrust.y = this.acceleration * Math.sin(this.angle);
        }
        if ( this.keyHandler.keys.indexOf("ArrowLeft") > -1 ) {
            this.rotation = -this.turnSpeed / 180 * Math.PI;
        }
        if ( this.keyHandler.keys.indexOf("ArrowRight") > -1 ) {
            this.rotation = this.turnSpeed / 180 * Math.PI;
        }
        if ( this.keyHandler.keys.indexOf(" ") > -1 ) {
            if ( this.frames > this.reload ) {
                this.frames = 0;
                this.laserSound.pause();
                this.laserSound.currentTime = 0;
                this.laserSound.play();
                this.projectileService.fire();
            }
        }

        this.angle += this.rotation;
        this.x += this.thrust.x;
        this.y += this.thrust.y;

        this.projectileService.update();
    }

    render() {
        this.projectileService.render();
        if ( this.state == this.alive ) {
            this.fx.rotateAndDrawImage(this.img, this.x,this.y, this.angle);
        }
    }

    kill() {
        this.state = this.dying;
        this.particles.spawn(16,this);
        this.boom.pause();
        this.boom.currentTime = 0;
        this.boom.play();
    }
}