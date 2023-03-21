class ProjectileService {

    constructor(owner) {
        this.owner = owner;
        this.max = 10;
        this.pointer = 0;
        this.collection = [];
    }

    init() {
        this.pointer = 0;
        this.collection = [];
        for ( let i = 0; i < this.max; i++ ) {
            let p = new Projectile(this.owner);
            p.init();
            this.collection.push(p);
        }
    }

    update() {
        this.collection.forEach(p => {
            p.update();
        });
    }

    render() {
        this.collection.forEach(p => {
            p.render();
        });
    }

    fire() {
        if ( this.pointer < this.max ) {
            this.collection[this.pointer].fire();
            this.pointer++;
        }
        else {
            this.pointer = 0;
        }
    }
}

class Projectile {

    constructor(owner) {
        this.owner = owner;
        this.angle = this.owner.angle;
        this.speed = 15;
        this.x = 0;
        this.y = 0;
        this.size = 3;
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
            this.fx.drawCircle(this.x,this.y,this.size,"limegreen");
        }
    }

    fire() {
        this.angle = this.owner.angle;
        this.alive = this.lifeSpan;
        this.x = this.owner.x + this.owner.img.width/2;
        this.y = this.owner.y + this.owner.img.height/2;
        this.active = true;
    }
}