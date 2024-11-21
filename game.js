"use strict";

window.addEventListener("load", init);

const player = {
  x: 144,
  y: 144,
  speed: 300,
};

const enemy = {
  x: 144,
  y: 50,
  width: 32,
  height: 32,
  speed: 100,
  direction: 1,
};

const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
};

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

function handleKeyDown(event) {
  if (event.key === "ArrowLeft") controls.left = true;
  if (event.key === "ArrowRight") controls.right = true;
  if (event.key === "ArrowUp") controls.up = true;
  if (event.key === "ArrowDown") controls.down = true;
}

function handleKeyUp(event) {
  if (event.key === "ArrowLeft") controls.left = false;
  if (event.key === "ArrowRight") controls.right = false;
  if (event.key === "ArrowUp") controls.up = false;
  if (event.key === "ArrowDown") controls.down = false;
}

let lastTime = 0;

const fieldWidth = 320;
const fieldHeight = 320;

function init() {
  requestAnimationFrame(tick);
  console.log("Game is running");
}

function displayPlayer() {
  const visualPlayer = document.getElementById("player");
  visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}

function displayEnemy() {
  const visualEnemy = document.getElementById("enemy");
  visualEnemy.style.translate = `${enemy.x}px ${enemy.y}px`;
}

function tick(timeStamp) {
  requestAnimationFrame(tick);

  let currentTime = timeStamp;
  let deltaTime = (currentTime - lastTime) / 1000;

  lastTime = currentTime;

  movePlayer(deltaTime);
  moveEnemy(deltaTime);
  checkCollision();

  displayPlayer();
  displayEnemy();
}

function movePlayer(deltaTime) {
  if (controls.left) player.x -= player.speed * deltaTime;
  if (controls.right) player.x += player.speed * deltaTime;
  if (controls.up) player.y -= player.speed * deltaTime;
  if (controls.down) player.y += player.speed * deltaTime;

  player.x = Math.max(0, Math.min(fieldWidth - 32, player.x));
  player.y = Math.max(0, Math.min(fieldHeight - 32, player.y));
}

function moveEnemy(deltaTime) {
  enemy.y += enemy.speed * deltaTime * enemy.direction;

  if (enemy.y <= 0 || enemy.y >= fieldHeight - enemy.height) {
    enemy.direction *= -1;
  }
}

function checkCollision() {
  const isColliding =
    player.x < enemy.x + enemy.width &&
    player.x + 32 > enemy.x &&
    player.y < enemy.y + enemy.height &&
    player.y + 32 > enemy.y;

  if (isColliding) {
    document.getElementById("player").classList.add("collision");
  } else {
    document.getElementById("player").classList.remove("collision");
  }
}

