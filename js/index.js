let todeg = (rad) => rad * 180 / Math.PI;

class Game {
    constructor()
    {
        this.playery = 300;
        this.playerx = 600;
        this.rot = 0;
        this.events();
        this.gamepads = [];
        this.elPlayer = document.querySelector('.player');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.speed = 5;
        this.rotspeed = 5;
    }
    
    move(dx, dy) {
        this.playerx += dx;
        this.playery += dy;
        this.sync();
    }
    
    rotate(dx, dy) {
        this.rot = Math.atan2(dy, dx) || this.rot;
        this.sync();
    }
    
    sync() {
        this.elPlayer.style.top = (this.height - this.playery) + 'px';
        this.elPlayer.style.left = this.playerx + 'px';
        this.elPlayer.style.transform = 'rotate(' + (90 + todeg(this.rot)) + 'deg)';
    }
    
    gpConnected(ev) {
        this.gamepads.push(ev.gamepad);
        this.animate();
    }
    
    frame() {
        this.move(this.gamepads[0].axes[0] * this.speed, -this.gamepads[0].axes[1] * this.speed);
        this.rotate(this.gamepads[0].axes[2] * this.rotspeed, this.gamepads[0].axes[3] * this.rotspeed);
        //console.log(this.gamepads[0].axes);
    }
    
    animate() {
        this.frame();
        requestAnimationFrame(this.animate.bind(this));
    }
    
    events() {
        window.addEventListener('gamepadconnected', this.gpConnected.bind(this));
    }
}

let game = new Game();
