var ctx;
var unitSize = 20;
var canvasWidth = 400;
var canvasHeight = 400;
var snake;
var snakeSquares = [];
var snakeColor = '#49B02B';
var defaultDirection = 'left';
var raf;
var go = false;

function start() {
    ctx = document.getElementById("gameCanvas").getContext("2d");
    snake = new Square(unitSize, 40, 40, snakeColor, 'snake');
    snakeSquares.push(snake);
    updateScreen();
    showHeader();
}

function showHeader() {
    var headerCtx = document.getElementById("header").innerHTML = "Welcome Message";
}

function Square(size, x, y, color, type) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type;

    if (type==='snake') {
        this.direction = defaultDirection;
        this.changeDirection = function(newDirection) {
            this.direction = newDirection;
        }
    }

    this.update = function () {
        this.ctx = document.getElementById("gameCanvas").getContext("2d");
        snakeColor = changeHue(snakeColor, 'r');
        ctx.fillStyle = snakeColor;
        ctx.fillRect(snake.x, snake.y, unitSize, unitSize, 'snake');
        this.printSquare();
    }
    this.printSquare = function () {
        console.log(`${this.type} was made at ` + this.x + ", " + this.y);
    }
}

function updateScreen() {
    for (part in snakeSquares) {
        snakeSquares[part].update();
    }
    if (go) {
        moveTo(getNextLocation(snake.direction));
        raf = window.requestAnimationFrame(updateScreen);
    } else {
        console.log("game stopped.")
    }
}

function getNextLocation(direction) {
    if (direction === 'right') {
        snake.x = (snake.x + unitSize) % canvasWidth;
    } else if (direction === 'left') {
        if (snake.x - unitSize < 0)
            snake.x = canvasWidth - unitSize;
        else
            snake.x = Math.abs((snake.x - unitSize) % canvasWidth);
    } else if (direction === 'down') {
        snake.y = (snake.y + unitSize) % canvasHeight;
    } else if (direction === 'up') {
        if (snake.y - unitSize < 0)
            snake.y = canvasHeight - unitSize;
        else
            snake.y = Math.abs((snake.y - unitSize) % canvasHeight);
    }
    return [snake.x,snake.y];
}

function moveTo(x,y) {
    snake.x = getNextLocation(snake.direction)[0];
    snake.y = getNextLocation(snake.direction)[1];
    snakeSquares.push(new Square(unitSize, snake.x, snake.y, snakeColor, 'snake'));
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        snake.direction = 'left';
    } else if (event.key === 'ArrowDown') {
        snake.direction = 'down';
    } else if (event.key === 'ArrowRight') {
        snake.direction = 'right';
    } else if (event.key === 'ArrowUp') {
        snake.direction = 'up';
    } else if (event.key === '1') { //start drawing in the canvas
        go = true;
        updateScreen();
    } else if (event.key === '2') { //stop drawing
        go = false;
    }
});

function changeHue(currentColor, choice) {
    const hueLimit = 256;
    var r = parseInt(currentColor[1] + currentColor[2], 16);
    var g = parseInt(currentColor[3] + currentColor[4], 16);
    var b = parseInt(currentColor[5] + currentColor[6], 16);
    //console.log("r was " + r + ", g was " + g + ", b was " + b);
    if (choice === 'r') {
        r = (r + 1) % hueLimit;
    } else if (choice === 'g') {
        g = (g + 1) % hueLimit;
    } else if (choice === 'b') {
        b = (b + 1) % hueLimit;
    }
    //console.log("r now " + r + ", g now " + g + ", b now " + b);
    var newHue = '#' + pad(r.toString(16)) + pad(g.toString(16)) + pad(b.toString(16));
    //console.log("color is " + newHue);
    return newHue;

    function pad(string) {
        if (string.length === 1)
            return '0' + string;
        return string;
    }
}