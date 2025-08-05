const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const gameArea = document.querySelector('.game-area');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
const submitButton = document.getElementById('submit-score');

const toggleSettingsBtn = document.getElementById('toggle-settings-btn');
const resetSettingsBtn = document.getElementById('reset-settings-btn');
const settingsPanel = document.getElementById('settings-panel');

let score = 0;
let level = 1;
let isJumping = false;
let isMovingLeft = false;
let isMovingRight = false;
let obstacles = [];
let animationFrameId = null;
let lastObstacleTime = 0;

let baseScrollSpeed = 1;
let obstacleSpacing = 2000;
let gameSpeedMultiplier = 1;
let obstacleSize = 30;
let jumpHeight = 100;
let gravity = 3.5;

const bgImages = ['bg1.png', 'bg2.png', 'bg3.png'];
let currentBgIndex = 0;
let backgroundPosX = 0;

function defaultSettings() {
  return {
    screenWidth: 640,
    screenHeight: 480,
    fitWindow: false,
    obstacleSpacing: 5000,
    baseScrollSpeed: 1,
    gameSpeedMultiplier: 1,
    obstacleSize: 30,
    jumpHeight: 100,
    gravity: 3.5,
  };
}

function loadSettings() {
  const saved = JSON.parse(localStorage.getItem('gameSettings'));
  const defaults = defaultSettings();
  const settings = saved || defaults;

  obstacleSpacing = settings.obstacleSpacing;
  baseScrollSpeed = settings.baseScrollSpeed;
  gameSpeedMultiplier = settings.gameSpeedMultiplier;
  obstacleSize = settings.obstacleSize;
  jumpHeight = settings.jumpHeight;
  gravity = settings.gravity;

  document.getElementById('obstacle-spacing').value = obstacleSpacing;
  document.getElementById('scroll-speed').value = baseScrollSpeed;
  document.getElementById('game-speed').value = gameSpeedMultiplier;
  document.getElementById('obstacle-size').value = obstacleSize;
  document.getElementById('jump-height').value = jumpHeight;
  document.getElementById('gravity').value = gravity;
  document.getElementById('screen-width').value = settings.screenWidth;
  document.getElementById('screen-height').value = settings.screenHeight;
  document.getElementById('fit-window').checked = settings.fitWindow;
}

function saveSettings() {
  const settings = {
    obstacleSpacing: parseInt(document.getElementById('obstacle-spacing').value),
    baseScrollSpeed: parseFloat(document.getElementById('scroll-speed').value),
    gameSpeedMultiplier: parseFloat(document.getElementById('game-speed').value),
    obstacleSize: parseInt(document.getElementById('obstacle-size').value),
    jumpHeight: parseInt(document.getElementById('jump-height').value),
    gravity: parseFloat(document.getElementById('gravity').value),
  };
  localStorage.setItem('gameSettings', JSON.stringify(settings));
  return settings;
}

function resetToDefaultSettings() {
  const defaults = defaultSettings();

  // 更新输入框
  document.getElementById('obstacle-spacing').value = defaults.obstacleSpacing;
  document.getElementById('scroll-speed').value = defaults.baseScrollSpeed;
  document.getElementById('game-speed').value = defaults.gameSpeedMultiplier;
  document.getElementById('obstacle-size').value = defaults.obstacleSize;
  document.getElementById('jump-height').value = defaults.jumpHeight;
  document.getElementById('gravity').value = defaults.gravity;

  // 还原游戏运行参数
  obstacleSpacing = defaults.obstacleSpacing;
  baseScrollSpeed = defaults.baseScrollSpeed;
  gameSpeedMultiplier = defaults.gameSpeedMultiplier;
  obstacleSize = defaults.obstacleSize;
  jumpHeight = defaults.jumpHeight;
  gravity = defaults.gravity;

  // 同步保存到 localStorage
  localStorage.setItem('gameSettings', JSON.stringify(defaults));

  alert('参数已还原为默认值');
}

function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.width = obstacleSize + 'px';
  obstacle.style.height = obstacleSize + 'px';
  obstacle.position = gameArea.offsetWidth;
  obstacle.style.left = obstacle.position + 'px';
  gameArea.appendChild(obstacle);
  obstacles.push(obstacle);
}

function moveObstacles(speed) {
  obstacles.forEach((obstacle, index) => {
    obstacle.position -= speed * gameSpeedMultiplier;
    obstacle.style.left = obstacle.position + 'px';

    if (obstacle.position + obstacleSize < 0) {
      obstacle.remove();
      obstacles.splice(index, 1);
    }

    if (isColliding(obstacle)) {
      endGame();
    }

    if (
      obstacle.position + obstacleSize < gameArea.offsetWidth / 2 &&
      !obstacle.passed
    ) {
      obstacle.passed = true;
      score++;
      scoreDisplay.textContent = score;

      if (score % 5 === 0) {
        level++;
        levelDisplay.textContent = level;
        if (obstacleSpacing > 500) obstacleSpacing -= 200;
      }
    }
  });
}

function isColliding(obstacle) {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  const horizontalOverlap =
    !(playerRect.right < obstacleRect.left || playerRect.left > obstacleRect.right);
  const verticalSafe = playerRect.bottom > obstacleRect.top + 10;

  return horizontalOverlap && verticalSafe;
}

let playerBottom = 0;
let velocityY = 0;

function jump() {
  if (isJumping) return;
  isJumping = true;
  velocityY = jumpHeight / 10;
}

function applyGravity() {
  if (isJumping) {
    velocityY -= gravity / 10;
    playerBottom += velocityY;

    if (playerBottom <= 0) {
      playerBottom = 0;
      isJumping = false;
      velocityY = 0;
    }

    player.style.bottom = playerBottom + 'px';
  }
}

function movePlayer() {
  let left = player.offsetLeft;
  if (isMovingLeft) {
    left -= baseScrollSpeed * gameSpeedMultiplier;
  }
  if (isMovingRight) {
    left += baseScrollSpeed * gameSpeedMultiplier;
  }
  // 限制範圍
  left = Math.min(Math.max(0, left), gameArea.offsetWidth - player.offsetWidth);
  player.style.left = left + 'px';
}

function moveBackground(speed) {
  backgroundPosX -= speed * gameSpeedMultiplier;
  if (backgroundPosX <= -gameArea.offsetWidth) {
    backgroundPosX = 0;
    currentBgIndex = (currentBgIndex + 1) % bgImages.length;
    gameArea.style.backgroundImage = `url('images/${bgImages[currentBgIndex]}')`;
  }
  gameArea.style.backgroundPositionX = backgroundPosX + 'px';
}

let lastFrameTime = 0;
let isPaused = false;
let isGameRunning = false;

function gameLoop(timestamp) {
  if (!lastFrameTime) lastFrameTime = timestamp;
  const delta = timestamp - lastFrameTime;

  if (!isPaused && isGameRunning) {
    movePlayer();
    applyGravity();

    let scrollSpeed = 0;
    if (isMovingLeft) scrollSpeed = -baseScrollSpeed;
    else if (isMovingRight) scrollSpeed = baseScrollSpeed;

    moveBackground(scrollSpeed);
    moveObstacles(scrollSpeed);

    if (Date.now() - lastObstacleTime > obstacleSpacing) {
      createObstacle();
      lastObstacleTime = Date.now();
    }
  }

  lastFrameTime = timestamp;
  animationFrameId = requestAnimationFrame(gameLoop);
}

function startGame() {
  resetGame();
  isGameRunning = true;
  isPaused = false;
  startBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
  resumeBtn.style.display = 'none';
  submitButton.style.display = 'none';
  lastObstacleTime = Date.now();
  animationFrameId = requestAnimationFrame(gameLoop);
}

function pauseGame() {
  isPaused = true;
  cancelAnimationFrame(animationFrameId);
  pauseBtn.style.display = 'none';
  resumeBtn.style.display = 'inline-block';
}

function resumeGame() {
  isPaused = false;
  lastObstacleTime = Date.now();
  pauseBtn.style.display = 'inline-block';
  resumeBtn.style.display = 'none';
  animationFrameId = requestAnimationId = requestAnimationFrame(gameLoop);
}

function endGame() {
  isGameRunning = false;
  isPaused = true;
  cancelAnimationFrame(animationFrameId);
  alert('游戏结束！得分：' + score);
  pauseBtn.style.display = 'none';
  resumeBtn.style.display = 'none';
  submitButton.style.display = 'inline-block';
}

function resetGame() {
  score = 0;
  level = 1;

  const settings = saveSettings();
  obstacleSpacing = settings.obstacleSpacing;
  baseScrollSpeed = settings.baseScrollSpeed;
  gameSpeedMultiplier = settings.gameSpeedMultiplier;
  obstacleSize = settings.obstacleSize;
  jumpHeight = settings.jumpHeight;
  gravity = settings.gravity;

  obstacles.forEach((obstacle) => obstacle.remove());
  obstacles = [];
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
  player.style.left = (gameArea.offsetWidth / 2 - player.offsetWidth / 2) + 'px';
  player.style.bottom = '0px';
  playerBottom = 0;
  velocityY = 0;
  backgroundPosX = 0;
  currentBgIndex = 0;
  gameArea.style.backgroundImage = `url('images/${bgImages[currentBgIndex]}')`;
}

startBtn.addEventListener('click', () => {
  saveSettings();
  startGame();
});
pauseBtn.addEventListener('click', pauseGame);
resumeBtn.addEventListener('click', resumeGame);
submitButton.addEventListener('click', submitScore);

toggleSettingsBtn.addEventListener('click', () => {
  if (settingsPanel.style.display === 'none') {
    settingsPanel.style.display = 'block';
    resetSettingsBtn.style.display = 'inline-block';
  } else {
    settingsPanel.style.display = 'none';
    resetSettingsBtn.style.display = 'none';
  }
});

resetSettingsBtn.addEventListener('click', resetToDefaultSettings);

window.onload = loadSettings;

function submitScore() {
  fetch('api/upload_score.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `score=${score}&level=${level}`,
  })
    .then((res) => res.text())
    .then(() => {
      alert('分数上传成功！');
      startBtn.style.display = 'inline-block';
      submitButton.style.display = 'none';
    })
    .catch(() => {
      alert('分数上传失败，请稍后再试。');
    });
}

// 键盘事件
document.addEventListener('keydown', (e) => {
  if (!isGameRunning || isPaused) return;

  if (e.key === 'ArrowUp') jump();
  if (e.key === 'ArrowLeft') isMovingLeft = true;
  if (e.key === 'ArrowRight') isMovingRight = true;
});

document.addEventListener('keyup', (e) => {
  if (!isGameRunning) return;

  if (e.key === 'ArrowLeft') isMovingLeft = false;
  if (e.key === 'ArrowRight') isMovingRight = false;
});
