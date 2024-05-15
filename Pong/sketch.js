class Racket {
    constructor(x) {
        this.x = x;
        this.y = height / 2;
        this.w = 10;
        this.h = 60;
    }
    update() {

        // se a raquete for o jogador
        if (this.x < width / 2) {
            this.y = mouseY;
        } else {
            // se a bola está em cima, vai pra cima
            if (ball.y < this.y) {
                this.y -= 5;
            } else {
                this.y += 5;
            }

        }
        // limita a raquete a ficar dentro da tela
        this.y = constrain(this.y, 0, height - this.h);
    }
    draw() {
        fill(color(255, 255, 255));
        rect(this.x, this.y, this.w, this.h);
    }
}

class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        const maximumSpeed = 5;
        this.xspeed = Math.floor(Math.random() * maximumSpeed * 2) - maximumSpeed;
        this.yspeed = Math.floor(Math.random() * maximumSpeed * 2) - maximumSpeed;
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

        
        if (colideCircleRect(this.x, this.y, this.r, player.x, player.y, player.w, player.h) || 
        colideCircleRect(this.x, this.y, this.r, computer.x, computer.y, computer.w, computer.h)) {
            this.xspeed *= -1;
            this.xspeed *= 1.1;
            this.yspeed *= 1.1;

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

// verifica a colisão entre um círculo e um retângulo
// onde círculo é raio e cx, cy 
// e retângulo é x, y, w, h
function colideCircleRect(cx, cy, raio, x, y, w, h) {
    let testX = cx;
    let testY = cy;

    if (cx < x) {
        testX = x;
    } else if (cx > x + w) {
        testX = x + w;
    }

    if (cy < y) {
        testY = y;
    } else if (cy > y + h) {
        testY = y + h;
    }

    let distX = cx - testX;
    let distY = cy - testY;
    let distance = sqrt((distX * distX) + (distY * distY));

    if (distance <= raio) {
        return true;
    }
    return false;
}

let ball;
let player;
let computer;

function setup() {
    createCanvas(800, 400);
    ball = new Ball(400, 200, 25);
    player = new Racket(30);
    computer = new Racket(width - 30 - 10);
}

function draw() {
    background(0, 0, 0);
    ball.update();
    ball.draw();
    player.update();
    player.draw();
    computer.update();
    computer.draw();
}

