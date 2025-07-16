<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <title>Hello World 範例</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding-top: 50px;
        }
        .blink {
            font-size: 24px;
            color: red;
            animation: blink-animation 1s steps(2, start) infinite;
        }
        @keyframes blink-animation {
            to {
                visibility: hidden;
            }
        }
    </style>
</head>
<body>

    <h1>Hello World!</h1>

    <!-- 顯示圖片 -->
    <img src="https://via.placeholder.com/200x100.png?text=範例圖片" alt="範例圖片">

    <p>
        這是一個範例網站連結：<br>
        <a href="https://www.google.com" target="_blank">前往 Google</a>
    </p>

    <!-- 閃爍文字 -->
    <p class="blink">閃爍的文字效果</p>

</body>
</html>