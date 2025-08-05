let score = 0;
let timeLeft = 30;
let targetKey = document.getElementById('target-key');
let scoreDisplay = document.getElementById('score');
let timeDisplay = document.getElementById('time');
let startButton = document.getElementById('start-btn');
let gameActive = false;

// 启动游戏
startButton.addEventListener('click', () => {
  if (gameActive) return;
  gameActive = true;
  score = 0;
  timeLeft = 30;
  updateScore();
  updateTime();
  startGame();
});

function startGame() {
  setInterval(() => {
    if (timeLeft <= 0) {
      gameActive = false;
      alert('游戏结束，得分: ' + score);
      return;
    }
    timeLeft--;
    updateTime();
  }, 1000);
}

// 更新得分和时间显示
function updateScore() {
  scoreDisplay.textContent = score;
}

function updateTime() {
  timeDisplay.textContent = timeLeft;
}

// 监听键盘按键事件
document.addEventListener('keydown', (event) => {
  if (!gameActive) return;
  if (event.key.toUpperCase() === targetKey.textContent.toUpperCase()) {
    score++;
    targetKey.textContent = getRandomKey();
    updateScore();
  }
});

function getRandomKey() {
  const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return keys[Math.floor(Math.random() * keys.length)];
}
