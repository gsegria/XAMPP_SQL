<?php
// save_score.php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $playerName = $_POST['player_name'];
  $score = $_POST['score'];

  if (!empty($playerName) && !empty($score)) {
    saveScore($playerName, $score);
    echo "分数保存成功！";
  } else {
    echo "玩家名称或分数为空！";
  }
}
?>
