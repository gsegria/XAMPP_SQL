// main.js
// 左側目錄滾動
document.querySelectorAll('.leftCol button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const targetId = btn.dataset.target;
    const el = document.getElementById(targetId);
    if(el){
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// 外部按鈕
function openResume(){ window.open('resume.html','_blank'); }
function open104Home(){ window.open('https://www.104.com.tw','_blank'); }
function openPingHsu104(){ window.open('https://pda.104.com.tw/profile/share/djb5ee77CIyTwJkJtemg443b6j7qkt40','_blank'); }
function openLinkedIn(){ window.open('https://www.linkedin.com','_blank'); }
function openLinkedInPingHsu(){ window.open('https://www.linkedin.com/in/ping-h-32b485104/','_blank'); }
function openNotion(){ window.open('https://www.notion.so','_blank'); }
function openPingbot(){
  const el = document.getElementById('chatbot');
  if(el){
    el.scrollIntoView({behavior:'smooth', block:'start'});
    document.getElementById('userInput').focus();
  }
}

function showMessage(msg) {
  console.log(msg);
  const chatbox = document.getElementById('chatbox');
  if(chatbox){
    const div = document.createElement('div');
    div.className = 'bot-msg';
    div.textContent = msg;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}

function openPingbot2() {
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

function openPingLocalGame() {
  showMessage('Button clicked: 前往 Ping local game');
  window.open('http://localhost/keyboard_game/index.html', '_blank', 'noopener,noreferrer');
}

function openPingGitGame() {
  showMessage('Button clicked: 前往 Ping Git game');
  window.open('https://gsegria.github.io/XAMPP_SQL/keyboard_game/index.html', '_blank', 'noopener,noreferrer');
}