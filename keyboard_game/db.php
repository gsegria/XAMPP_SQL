<?php
// db.php
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'game_db';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo '连接失败: ' . $e->getMessage();
}

function saveScore($playerName, $score) {
  global $pdo;
  $stmt = $pdo->prepare("INSERT INTO scores (player_name, score) VALUES (?, ?)");
  $stmt->execute([$playerName, $score]);
}

function getTopScores() {
  global $pdo;
  $stmt = $pdo->query("SELECT player_name, score FROM scores ORDER BY score DESC LIMIT 10");
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>


// 在游戏结束时调用这个函数
function saveScore(playerName, score) {
  let formData = new FormData();
  formData.append("player_name", playerName);
  formData.append("score", score);

  fetch('save_score.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    console.log('分数保存成功:', data);
  })
  .catch(error => {
    console.error('保存分数时出错:', error);
  });
}