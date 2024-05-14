// ball position
class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.xspeed = Math.floor(Math.random() * 10) - 5;
        this.yspeed = Math.floor(Math.random() * 10) - 5;
    }

    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;

        if (this.x < this.r || this.x > width - this.r) {
            this.reset();
        }

        if (this.y < this.r || this.y > height - this.r) {
            this.yspeed *= -1;
        }
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.xspeed = Math.floor(Math.random() * 10) - 5;
        this.yspeed = Math.floor(Math.random() * 10) - 5;
    }

    draw() {
        fill(255, 255, 255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}

let ball;

function setup() {
    createCanvas(800, 400);
    ball = new Ball(400, 200, 25);
}

function draw() {
    background(0, 0, 0);
    ball.update();
    ball.draw();
}