"use strict";

window.addEventListener("load", init);

const player = {
  x: 144,
  y: 144,
  speed: 300,
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

const fieldWidth = 800; // Example field width
const fieldHeight = 600; 

function init() {
requestAnimationFrame(tick);
console.log("Game is running");
}

function displayPlayer() {
  const visualPlayer = document.getElementById("player");
  visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}

function tick(timeStamp) {
  requestAnimationFrame(tick);

  let currentTime = timeStamp;
  let deltaTime = (currentTime - lastTime) / 1000;

  lastTime = currentTime;

  movePlayer(deltaTime);

  lastTime = currentTime;
  displayPlayer();
}

function movePlayer(deltaTime) {
    const newPosition = {x: player.x, y:player.y}
    if(canMove(newPosition)) {
    if (controls.left) player.x -= player.speed * deltaTime;
    if (controls.right) player.x += player.speed * deltaTime;
    if (controls.up) player.y -= player.speed * deltaTime;
    if (controls.down) player.y += player.speed * deltaTime;

    }
}

function canMove(position) {
  return (
    position.x >= 0 &&
    position.x <= fieldWidth &&
    position.y >= 0 &&
    position.y <= fieldHeight
  );
}