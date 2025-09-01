function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const model = document.getElementById("model").value;
  const message = input.value.trim();
  if (!message) return;

  // 顯示使用者訊息
  chatbox.innerHTML += `<div class="user-msg">👤 ${message}</div>`;
  input.value = '';

  // 呼叫後端 PHP
  fetch("pingbot.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `message=${encodeURIComponent(message)}&model=${model}`
  })
    .then(res => res.json())
    .then(data => {
      // 顯示機器人回覆
      chatbox.innerHTML += `<div class="bot-msg">🤖 ${data.reply}</div>`;
      chatbox.scrollTop = chatbox.scrollHeight; // 自動滾動到底部
    })
    .catch(err => {
      chatbox.innerHTML += `<div class="bot-msg">❌ 錯誤：${err}</div>`;
    });
}

// 監聽 Enter 鍵送出
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("userInput");
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // 防止換行
      sendMessage(); // 觸發送出
    }
  });
});
