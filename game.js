const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let player = { 
    x: 50, y: 300, width: 30, height: 50, dy: 0, gravity: 0.5, jumpPower: -10, onGround: false 
};

let platforms = [{ x: 0, y: 350, width: 800, height: 50 }];

let movingLeft = false;
let movingRight = false;

// Управление с клавиатуры
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && player.onGround) {
        player.dy = player.jumpPower;
        player.onGround = false;
    }
    if (e.code === "ArrowLeft") movingLeft = true;
    if (e.code === "ArrowRight") movingRight = true;
});

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") movingLeft = false;
    if (e.code === "ArrowRight") movingRight = false;
});

// Управление с телефона
document.getElementById("leftBtn").addEventListener("touchstart", () => movingLeft = true);
document.getElementById("leftBtn").addEventListener("touchend", () => movingLeft = false);

document.getElementById("rightBtn").addEventListener("touchstart", () => movingRight = true);
document.getElementById("rightBtn").addEventListener("touchend", () => movingRight = false);

document.getElementById("jumpBtn").addEventListener("touchstart", () => {
    if (player.onGround) {
        player.dy = player.jumpPower;
        player.onGround = false;
    }
});

function update() {
    player.dy += player.gravity;
    player.y += player.dy;

    if (movingLeft) player.x -= 5;
    if (movingRight) player.x += 5;

    player.onGround = false;
    for (let p of platforms) {
        if (
            player.x < p.x + p.width && player.x + player.width > p.x &&
            player.y + player.height > p.y && player.y + player.height - player.dy < p.y
        ) {
            player.y = p.y - player.height;
            player.dy = 0;
            player.onGround = true;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "green";
    for (let p of platforms) {
        ctx.fillRect(p.x, p.y, p.width, p.height);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
