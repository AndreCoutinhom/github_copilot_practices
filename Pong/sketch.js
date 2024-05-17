let ballImage;
let playerImage;
let computerImage;
let backgroundImage;

let bounceSound;
let goalSound;

let backgroundMusic;

let raichuScore;
let gyradosScore;

let playerScore = 0;
let computerScore = 0;

let myFont;

class Racket {
    constructor(x) {
        this.x = x;
        this.y = height / 2;
        this.w = 20;
        this.h = 100;
    }
    update() {

        // se a raquete for o jogador
        if (this.x < width / 2) {
            this.y = mouseY - this.h / 2;
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

        if (this.x < width / 2) {
            image(playerImage, this.x, this.y, this.w, this.h);
        } else {
            image(computerImage, this.x, this.y, this.w, this.h);
        }        


    }
}

class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = 15;
        const maximumSpeed = 5;
        this.xspeed = Math.floor(Math.random() * maximumSpeed * 2) - maximumSpeed;
        this.yspeed = Math.floor(Math.random() * maximumSpeed * 2) - maximumSpeed;
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.xspeed = Math.floor(Math.random() * 10) - 5;
        this.yspeed = Math.floor(Math.random() * 10) - 5;
        this.angulo = 0;
    }

    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        // rotaciona de acordo com a velocidade x e y
        this.angulo += Math.sqrt(this.xspeed * this.xspeed + this.yspeed * this.yspeed) / 100

        if (this.x < this.r || this.x > width - this.r) {
            if (this.x < this.r) {
                setTimeout(() => {
                    gyradosScore.play();
                }, 500);
                computerScore++;
                

            } else {
                setTimeout(() => {
                    raichuScore.play();
                }, 500);
                playerScore++;
                
            }
            goalSound.play();
            this.reset();
        }

        if (this.y < this.r || this.y > height - this.r) {
            this.yspeed *= -1;
            bounceSound.play();
        }

        
        if (colideCircleRect(this.x, this.y, this.r, player.x, player.y, player.w, player.h) || 
        colideCircleRect(this.x, this.y, this.r, computer.x, computer.y, computer.w, computer.h)) {
            bounceSound.play();
            this.xspeed *= -1;
            this.xspeed *= 1.1;
            this.yspeed *= 1.1;

    }
}

    draw() {
        // rotaciona antes de desenhar
        push();
        translate(this.x, this.y);
        rotate(this.angulo);
        imageMode(CENTER);
        image(ballImage, 0, 0, this.r * 2, this.r * 2);
        pop();
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

function preload() {
    ballImage = loadImage('images/pokeball.png');
    playerImage = loadImage('images/player.png');
    computerImage = loadImage('images/computer.png');
    backgroundImage = loadImage('images/background.png');
    bounceSound = loadSound('sound/bounce_sound.wav');
    goalSound = loadSound('sound/goal_sound.wav');
    raichuScore = loadSound('sound/raichu_sound.wav');
    gyradosScore = loadSound('sound/gyrados_sound.wav');
    backgroundMusic = loadSound('sound/background_music.wav');
    myFont = loadFont('font/pokemon_font.ttf');
}


function setup() {
    createCanvas(800, 400);
    ball = new Ball(400, 200, 25);
    player = new Racket(30);
    computer = new Racket(width - 30 - 10);

    textSize(25);
    textFont(myFont);
    textAlign(CENTER, CENTER);

    backgroundMusic.loop();
}

function draw() {
    image(backgroundImage, 0, 0, width, height);
    ball.update();
    ball.draw();
    player.update();
    player.draw();
    computer.update();
    computer.draw();

    // uma cor diferente para cada texto. 
    // cor do jogador é vermelha e do computador é azul
    fill(color('white'));
    text("Raichu: " + playerScore, width / 4, 50);
    text("Gyrados: " + computerScore, width * 3 / 4, 50);
}

