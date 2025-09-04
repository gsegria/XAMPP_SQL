function showMessage(text) {
  document.getElementById('message').textContent = text;
}

function open104Home() {
  showMessage('Button clicked: 前往 104');
  window.open('https://www.104.com.tw', '_blank', 'noopener,noreferrer');
}

function openPingHsu104() {
  showMessage('Button clicked: 前往 PingHsu\'s 104');
  window.open('https://www.104.com.tw/jobbank/...', '_blank', 'noopener,noreferrer');
}

function openLinkedIn() {
  showMessage('Button clicked: 前往 LinkedIn');
  window.open('https://www.linkedin.com/', '_blank', 'noopener,noreferrer');
}

function openLinkedInPingHsu() {
  showMessage('Button clicked: 前往 PingHsu\'s LinkedIn');
  window.open('https://www.linkedin.com/in/ping-h-32b485104/', '_blank', 'noopener,noreferrer');
}

function openNotion() {
  showMessage('Button clicked: 前往 Notion');
  window.open('https://www.notion.com/zh-tw/personal', '_blank', 'noopener,noreferrer');
}

function openPingbot() {
  const localhostURL = 'http://localhost/chatbot/pingbot.html'; // 你的本地開發網址
  const fallbackURL = 'https://gsegria.github.io/XAMPP_SQL/pingbot.html'; // 替換成實際 GitHub Page URL

  fetch(localhostURL, { method: 'HEAD', mode: 'no-cors' })
    .then(() => {
      console.log('成功連接 localhost，開啟本地頁面');
      window.open(localhostURL, '_blank', 'noopener,noreferrer');
    })
    .catch(() => {
      console.warn('無法連接 localhost，開啟 GitHub 備用頁面');
      window.open(fallbackURL, '_blank', 'noopener,noreferrer');
    });
}

function sendMessage() {
  const userInput = document.getElementById("userInput").value.trim();
  const model = document.getElementById("model").value;
  if (userInput === "") return;

  fetch("pingbot.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `message=${encodeURIComponent(userInput)}&model=${model}`
  })
    .then((response) => response.json())
    .then((data) => {
      const reply = data.reply || "⚠️ 系統無回應";
      document.getElementById("chatbox").innerHTML += `<div><strong>你：</strong>${userInput}</div>`;
      document.getElementById("chatbox").innerHTML += `<div><strong>PingBot：</strong>${reply}</div>`;
      document.getElementById("userInput").value = "";
    })
    .catch((error) => {
      console.error("錯誤:", error);
      alert("連接失敗，請確認伺服器與金鑰狀態");
    });
}


// 監聽輸入框，按下 Enter 鍵呼叫 sendMessage()
document.addEventListener('DOMContentLoaded', () => {
  const inputElem = document.getElementById('userInput');
  inputElem.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 防止換行
      sendMessage();
    }
  });
});
