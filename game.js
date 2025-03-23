const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { 
    x: 50, y: 300, width: 30, height: 50, dy: 0, gravity: 0.2, jumpPower: -10, onGround: false 
};

let platforms = [{ x: 0, y: canvas.height - 50, width: canvas.width, height: 50 }];

let movingLeft = false;
let movingRight = false;

// Управление с мобильного устройства
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
    player.dy += player.gravity;  // применяем гравитацию
    player.y += player.dy;  // двигаем игрока вниз

    if (movingLeft) player.x -= 5;  // Двигаемся влево
    if (movingRight) player.x += 5; // Двигаемся вправо

    // Ограничиваем движение игрока по оси X
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    player.onGround = false;

    // Проверяем столкновение с платформами
    for (let p of platforms) {
        if (
            player.x + player.width > p.x && player.x < p.x + p.width && // по оси X
            player.y + player.height <= p.y && player.y + player.height + player.dy > p.y // по оси Y
        ) {
            // Если есть столкновение, фиксируем игрока на платформе
            player.y = p.y - player.height;  // ставим игрока на платформу
            player.dy = 0;  // обнуляем скорость падения
            player.onGround = true;  // говорим, что игрок стоит на земле
        }
    }

    // Если игрок не на земле, продолжаем падение
    if (!player.onGround) {
        player.dy += player.gravity;  // продолжаем падение, если игрок не на платформе
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
