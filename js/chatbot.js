function sendMessage() {
  const inputElem = document.getElementById('userInput');
  const input = inputElem.value.trim();
  if (!input) return;

  const chatbox = document.getElementById('chatbox');
  chatbox.innerHTML += `<div class="user-msg">👤 ${input}</div>`;

  fetch('php/chatbot.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `message=${encodeURIComponent(input)}`
  })
  .then(res => res.json())
  .then(data => {
    chatbox.innerHTML += `<div class="bot-msg">🤖 ${data.reply}</div>`;
    inputElem.value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
  })
  .catch(err => {
    chatbox.innerHTML += `<div class="bot-msg error">❌ 發生錯誤：${err}</div>`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const inputElem = document.getElementById('userInput');
  inputElem.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });
});
