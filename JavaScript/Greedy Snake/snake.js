var canvasSize = 400, cell = 20, cellSize = canvasSize / cell;
var domCanvas = document.createElement("canvas");
domCanvas.width = domCanvas.height = canvasSize;
document.getElementById("canvas").appendChild(domCanvas);
var context = domCanvas.getContext("2d");
var domScore = document.getElementById("score");

var snake,
    snakeSpeed = 1000 / 60,
    food,
    currColor,
    isGameOver = false,
    score = 0,
    maxScore = window.localStorage.getItem("maxScore") || undefined, //expr1 || expr2 -> returns 'expr1' if it can be converted to true; otherwise, returns 'expr2.
    pieces = [],
    anonymousUser;

var helper = {
    Vec: class {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        add(v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        }
    },
    hasCollision(v1, v2) {
        return (v1.x == v2.x && v1.y == v2.y);
    },
    garbageCollector() {
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].size <= 0) {
                pieces.splice(i, 1); // at position i, remove 1 item
            }
        }
    },
    drawGrid() {
        context.lineWidth = 1;
        context.strokeStyle = "#232332";
        context.shadowBlur = 0;
        for (let i = 1; i < cell; i++) {
            let f = cellSize * i;
            context.beginPath();
            context.moveTo(f, 0);
            context.lineTo(f, canvasSize);
            context.stroke();
            context.beginPath();
            context.moveTo(0, f);
            context.lineTo(canvasSize, f);
            context.stroke();
            context.closePath();
        }
    },
    randomColor() {
        return ~~(Math.random() * 360); //if x>=0, ~~x = floor(x); if x<0, ~~x = ceil(x)
    },
    hsl2rgb(hue, saturation, lightness) {
        if (hue == undefined) {
            return [0, 0, 0];
        }
        let chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
        let huePrime = hue / 60;
        let secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

        huePrime = ~~huePrime;
        let red;
        let green;
        let blue;

        if (huePrime === 0) {
            red = chroma;
            green = secondComponent;
            blue = 0;
        }
        else if (huePrime === 1) {
            red = secondComponent;
            green = chroma;
            blue = 0;
        }
        else if (huePrime === 2) {
            red = 0;
            green = chroma;
            blue = secondComponent;
        }
        else if (huePrime === 3) {
            red = 0;
            green = secondComponent;
            blue = chroma;
        }
        else if (huePrime === 4) {
            red = secondComponent;
            green = 0;
            blue = chroma;
        }
        else if (huePrime === 5) {
            red = chroma;
            green = 0;
            blue = secondComponent;
        }

        let lightnessAdjustment = lightness - chroma / 2;
        red += lightnessAdjustment;
        green += lightnessAdjustment;
        blue += lightnessAdjustment;

        return [
            Math.round(red * 255),
            Math.round(green * 255),
            Math.round(blue * 255)
        ];
    },
    lerp(start, end, t) { //linear interpolation
        //No linear interpolation: disconnect movement
        //With linear interpolation: smooth transition between positions, per system requirements
        //https://webdva.github.io/how-i-implemented-client-side-linear-interpolation/#:~:text=The%20linear%20interpolation%20implemented%20as%20a%20JavaScript%20function,verb%20to%20lerp%20means%20to%20do%20linear%20interpolation
        return start * (1 - t) + end * t;
    }
};

var KEY = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    resetState() {
        this.ArrowUp = false;
        this.ArrowDown = false;
        this.ArrowLeft = false;
        this.ArrowRight = false;
    },
    listen() {
        addEventListener(
            "keydown",
            (e) => {
                if (e.key === "ArrowUp" && this.ArrowDown) {
                    return;
                }
                if (e.key === "ArrowDown" && this.ArrowUp) {
                    return;
                }
                if (e.key === "ArrowLeft" && this.ArrowRight) {
                    return;
                }
                if (e.key === "ArrowRight" && this.ArrowLeft) {
                    return;
                }
                this[e.key] = true;
                Object.keys(this)
                    .filter((f) => f !== e.key && f !== "listen" && f !== "resetState")
                    .forEach((k) => { this[k] = false; });
            }
        );
    }
};

class Snake {
    constructor(i, type) {
        this.pos = new helper.Vec(canvasSize / 2, canvasSize / 2);
        this.dir = new helper.Vec(0, 0);
        this.type = type;
        this.index = i;
        this.delay = 5;
        this.size = cellSize;
        this.color = "white";
        this.history = [];
        this.total = 1;
    }
    draw() {
        let { x, y } = this.pos;
        context.fillStyle = this.color;
        context.shadowBlur = 20;
        context.shadowColor = "rgba(255,255,255,0)";
        context.fillRect(x, y, this.size, this.size);
        context.shadowBlur = 0;
        if (this.total >= 2) {
            for (let i = 0; i < this.history.length - 1; i++) {
                let { x, y } = this.history[i];
                context.lineWidth = 1;
                context.fillStyle = "rgba(225,225,225,1)";
                context.fillRect(x, y, this.size, this.size);
            }
        }
    }
    walls() { //disappear from one wall and re-appear from the opposite
        let { x, y } = this.pos;
        if (x + cellSize > canvasSize) {
            this.pos.x = 0;
        }
        if (y + cellSize > canvasSize) {
            this.pos.y = 0;
        }
        if (y < 0) {
            this.pos.y = canvasSize - cellSize;
        }
        if (x < 0) {
            this.pos.x = canvasSize - cellSize;
        }
    }
    controlls() {
        let dir = this.size;
        if (KEY.ArrowUp) {
            this.dir = new helper.Vec(0, -dir);
        }
        if (KEY.ArrowDown) {
            this.dir = new helper.Vec(0, dir);
        }
        if (KEY.ArrowLeft) {
            this.dir = new helper.Vec(-dir, 0);
        }
        if (KEY.ArrowRight) {
            this.dir = new helper.Vec(dir, 0);
        }
    }
    selfCollision() {
        for (let i = 0; i < this.history.length; i++) {
            let p = this.history[i];
            if (helper.hasCollision(this.pos, p)) {
                isGameOver = true;
            }
        }
    }
    update() {
        this.walls();
        this.draw();
        this.controlls();
        if (!this.delay--) {
            if (helper.hasCollision(this.pos, food.pos)) {
                incrementScore();
                pieceSplit();
                food.spawn();
                this.total++;
            }
            this.history[this.total - 1] = new helper.Vec(this.pos.x, this.pos.y);
            for (let i = 0; i < this.total - 1; i++) {
                this.history[i] = this.history[i + 1];
            }
            this.pos.add(this.dir);
            this.delay = 5;
            this.total > 3 ? this.selfCollision() : null;
        }
    }
}

class Food {
    constructor() {
        this.pos = new helper.Vec(
            ~~(Math.random() * cell) * cellSize,
            ~~(Math.random() * cell) * cellSize
        );
        this.color = currColor = `hsl(${~~(Math.random() * 360)},100%,50%)`; //`hsla(${hue},${saturation}%,${lightness}%,${alpha})`
        this.size = cellSize;
    }
    draw() {
        let { x, y } = this.pos;

        // fluorescence
        context.globalCompositeOperation = "lighter";
        context.shadowBlur = 20;

        context.shadowColor = this.color;
        context.fillStyle = this.color;
        context.fillRect(x, y, this.size, this.size);
        context.globalCompositeOperation = "source-over";
        context.shadowBlur = 0;
    }
    spawn() {
        let randX = ~~(Math.random() * cell) * this.size;
        let randY = ~~(Math.random() * cell) * this.size;
        for (let path of snake.history) {
            if (helper.hasCollision(new helper.Vec(randX, randY), path)) {
                return this.spawn();
            }
        }
        this.color = currColor = `hsl(${helper.randomColor()}, 100%, 50%)`;
        this.pos = new helper.Vec(randX, randY);
    }
}

class Piece {
    constructor(pos, color, size, vel) {
        this.pos = pos;
        this.color = color;
        this.size = Math.abs(size / 2);
        this.tail = 0;
        this.gravity = -0.2;
        this.vel = vel;
    }
    draw() {
        let { x, y } = this.pos;
        let hsl = this.color
            .split("")
            .filter((l) => l.match(/[^hsl()$% ]/g))
            .join("")
            .split(",")
            .map((n) => +n);
        let [r, g, b] = helper.hsl2rgb(hsl[0], hsl[1] / 100, hsl[2] / 100);
        context.shadowColor = `rgb(${r},${g},${b},${1})`;
        context.shadowBlur = 0;
        context.globalCompositeOperation = "lighter";
        context.fillStyle = `rgb(${r},${g},${b},${1})`;
        context.fillRect(x, y, this.size, this.size);
        context.globalCompositeOperation = "source-over";
    }
    update() {
        this.draw();
        this.size -= 0.3;
        this.tail += 1;
        this.pos.add(this.vel);
        this.vel.y -= this.gravity;
    }
}

initialize();

function initialize() {
    context.imageSmoothingEnabled = false;
    KEY.listen();
    snake = new Snake();
    food = new Food();
    document.getElementById("play").addEventListener("click", reset, false);
    loop();
}

function loop() {
    clear();
    if (!isGameOver) {
        anonymousUser = setTimeout(loop, snakeSpeed);
        helper.drawGrid();
        snake.update();
        food.draw();
        for (let p of pieces) {
            p.update();
        }
        helper.garbageCollector();
    }
    else {
        clear();
        gameOver();
    }
}

function gameOver() {
    maxScore ? null : (maxScore = score);
    score > maxScore ? (maxScore = score) : null;
    window.localStorage.setItem("maxScore", maxScore);
    context.fillStyle = "#4cffd7";
    context.textAlign = "center";
    context.font = "bold 30px Poppins, sans-serif";
    context.fillText("GAME OVER", canvasSize / 2, canvasSize / 2);
    context.font = "15px Poppins, sans-serif";
    context.fillText(`SCORE   ${score}`, canvasSize / 2, canvasSize / 2 + 60);
    context.fillText(`MAXSCORE   ${maxScore}`, canvasSize / 2, canvasSize / 2 + 80);
}

function reset() {
    domScore.innerText = "00";
    score = 0;
    snake = new Snake();
    food.spawn();
    KEY.resetState();
    isGameOver = false;
    clearTimeout(anonymousUser); //clearTimeout() clears a timer set with the setTimeout() method
    loop();
}

function incrementScore() {
    score++;
    domScore.innerText = score.toString().padStart(2, "0");
}

function pieceSplit() {
    for (let i = 0; i < cell; i++) {
        let velo = new helper.Vec(Math.random() * 6 - 3, Math.random() * 6 - 3);
        let position = new helper.Vec(food.pos.x, food.pos.y);
        pieces.push(new Piece(position, currColor, food.size, velo));
    }
}

function clear() {
    context.clearRect(0, 0, canvasSize, canvasSize);
}
