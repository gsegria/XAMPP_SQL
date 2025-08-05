<?php
// leaderboard.php
include 'db.php';

$scores = getTopScores();
echo "<h2>排行榜</h2>";
echo "<table border='1'><tr><th>玩家</th><th>分数</th></tr>";
foreach ($scores as $score) {
  echo "<tr><td>" . htmlspecialchars($score['player_name']) . "</td><td>" . $score['score'] . "</td></tr>";
}
echo "</table>";
?>