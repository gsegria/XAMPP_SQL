<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $score = $_POST['score'] ?? 0;
    $level = $_POST['level'] ?? 1;

    // 真正環境下應寫入資料庫
    echo "Score received: $score (Level: $level)";
} else {
    echo "Invalid Request.";
}
?>
