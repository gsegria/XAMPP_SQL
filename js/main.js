function showMessage(text) {
  document.getElementById('message').textContent = text;
}

// function openResume() {
//   showMessage('Button clicked: 打開 Resume');
//   window.open('resume.php', 'ResumeWindow', 'width=900,height=700');
// }
function openResume() {
    showMessage('Button clicked: 打開 Resume');

    // 取得目前網址的 host
    const host = window.location.hostname;

    let resumeUrl = '';

    if (host === 'localhost' || host === '127.0.0.1') {
      // 本地開發環境：開啟 PHP 頁面
      resumeUrl = 'http://localhost/chatbot/resume.php';
    } else {
      // GitHub Pages 等線上環境：開啟靜態 HTML 頁面
      resumeUrl = 'https://gsegria.github.io/XAMPP_SQL/resume.index.html';
    }

    window.open(resumeUrl, 'ResumeWindow', 'width=900,height=700');
  }

function open104Home() {
  showMessage('Button clicked: 前往 104');
  window.open('https://www.104.com.tw', '_blank', 'noopener,noreferrer');
}

function openPingHsu104() {
  showMessage("Button clicked: 前往 PingHsu's 104");
  window.open('https://www.104.com.tw/jobbank/...', '_blank', 'noopener,noreferrer');
}

function openLinkedIn() {
  showMessage('Button clicked: 前往 LinkedIn');
  window.open('https://www.linkedin.com/', '_blank', 'noopener,noreferrer');
}

function openLinkedInPingHsu() {
  showMessage("Button clicked: 前往 PingHsu's LinkedIn");
  window.open('https://www.linkedin.com/in/ping-h-32b485104/', '_blank', 'noopener,noreferrer');
}

function openNotion() {
  showMessage('Button clicked: 前往 Notion');
  window.open('https://www.notion.com/zh-tw/personal', '_blank', 'noopener,noreferrer');
}

function openPingbot() {
  showMessage('Button clicked: 前往 PingBot');
  window.open('http://localhost/chatbot/pingbot.html', '_blank', 'noopener,noreferrer');
}

function openPingLocalGame() {
  showMessage('Button clicked: 前往 Ping local game');
  window.open('http://localhost/keyboard_game/index.html', '_blank', 'noopener,noreferrer');
}

function openPingGitGame() {
  showMessage('Button clicked: 前往 Ping Git game');
  window.open('https://gsegria.github.io/XAMPP_SQL/keyboard_game/index.html', '_blank', 'noopener,noreferrer');
}
