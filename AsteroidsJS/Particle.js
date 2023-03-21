class ParticleService {

    constructor() {
        this.collection = [];
        this.fx = new Fx();
    }

    init() {
        this.collection = [];
        this.fx.init();
    }

    update() {
        for ( let i = 0; i < this.collection.length; i++ ) {
            this.collection[i].update();
            if ( this.collection[i].active == false ) {
                this.collection.splice(i, 1);
            }
        }
    }

    render() {
        this.collection.forEach(p => {
            p.render();
        });
    }

    spawn(total, owner) {
        for ( let i = 0; i < total; i++ ) {
            let particle = new Particle(owner);
            this.collection.push(particle);
            particle.init();
            particle.activate();
        }
    }
}

class Particle {

    constructor(owner) {
        this.owner = owner;
        this.angle = 0;
        this.speed = 0;
        this.x = 0;
        this.y = 0;
        this.size = 2;
        this.active = false;
        this.lifeSpan = 100;
        this.alive = this.lifeSpan;
        this.fx = new Fx();
    }

    init() {
        this.active = false;
        this.fx.init();
    }

    update() {
        if ( this.active ) {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.alive--;
            this.active = this.alive > 0 ? true : false;
        } 
    }

    render() {
        if ( this.active ) {
            this.fx.drawCircle(this.x,this.y,this.size,"#fff");
        }
    }

    activate() {
        this.angle = Math.random()*Math.PI*2.0;
        this.speed = Math.random()*15;
        this.alive = this.lifeSpan;
        this.x = this.owner.x + this.owner.img.width/2;
        this.y = this.owner.y + this.owner.img.height/2;
        this.active = true;
    }
}