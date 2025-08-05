function showMessage(text) {
  document.getElementById('message').textContent = text;
}

function open104Home() {
  showMessage('Button clicked: 前往 104');
  window.open('https://www.104.com.tw','_blank','noopener,noreferrer');
}

function openPingHsu104() {
  showMessage('Button clicked: 前往 PingHsu\'s 104');
  window.open('https://www.104.com.tw/jobbank/...','_blank','noopener,noreferrer');
}

function openLinkedIn() {
  showMessage('Button clicked: 前往 LinkedIn');
  window.open('https://www.linkedin.com/','_blank','noopener,noreferrer');
}

function openLinkedInPingHsu() {
  showMessage('Button clicked: 前往 PingHsu\'s LinkedIn');
  window.open('https://www.linkedin.com/in/ping-h-32b485104/','_blank','noopener,noreferrer');
}

function openNotion() {
  showMessage('Button clicked: 前往 Notion');
  window.open('https://www.notion.com/zh-tw/personal','_blank','noopener,noreferrer');
}

function sendMessage() {
  const input = document.getElementById('userInput').value.trim();
  if (!input) return;

  const chatbox = document.getElementById('chatbox');
  chatbox.innerHTML += `<div class="user-msg">👤 ${input}</div>`;

  fetch('chatbot.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `message=${encodeURIComponent(input)}`
  })
  .then(res => res.json())
  .then(data => {
    chatbox.innerHTML += `<div class="bot-msg">🤖 ${data.reply}</div>`;
    document.getElementById('userInput').value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
  })
  .catch(err => {
    chatbox.innerHTML += `<div class="bot-msg error">❌ 發生錯誤：${err}</div>`;
  });
}
