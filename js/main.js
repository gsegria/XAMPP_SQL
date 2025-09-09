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
function open_master_thesis(){ window.open('https://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi/ccd=q37ACz/search?s=id=%22105MHIT1428007%22.&openfull=1&setcurrent=1#XXX.html','_blank'); }
function open104Home(){ window.open('https://www.104.com.tw','_blank'); }
function openPingHsu104(){ window.open('https://pda.104.com.tw/profile/share/eVxtgFxQ1XlSmvuJ524o7WkasUpfqozW','_blank'); }
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

// function loadCertificateSection() {
//   fetch('https://gsegria.github.io/XAMPP_SQL/07_certificate.html')
//     .then(response => response.text())
//     .then(data => {
//       document.getElementById('certificate-section').innerHTML = data;
//     })
//     .catch(error => {
//       console.error('載入證書失敗：', error);
//     });
// }

// // 當頁面載入完畢後執行
// document.addEventListener("DOMContentLoaded", loadCertificateSection);


function loadSection(id, url) {
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`無法載入 ${url}`);
      return res.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(err => {
      console.error(err);
      document.getElementById(id).innerHTML = '載入失敗';
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadSection("section-medicine", "https://gsegria.github.io/XAMPP_SQL/03_medicine.html");
  loadSection("section-npm", "https://gsegria.github.io/XAMPP_SQL/04_npm.html");
  loadSection("section-stm32", "https://gsegria.github.io/XAMPP_SQL/05_STM32_IDE.html");
  loadSection("section-dart", "https://gsegria.github.io/XAMPP_SQL/06_dart.html");
  loadSection("certificate-section", "https://gsegria.github.io/XAMPP_SQL/07_certificate.html");
});



function openPingbot2() {
  const localhostURL = 'http://localhost/chatbot/pingbot.html';
  const fallbackURL = 'https://gsegria.github.io/XAMPP_SQL/pingbot.html';

  const testImg = new Image();

  testImg.onload = function () {
    // 如果本機回應了圖片，就當作 localhost 有啟動
    console.log('成功連接 localhost，開啟本地頁面');
    window.open(localhostURL, '_blank', 'noopener,noreferrer');
  };

  testImg.onerror = function () {
    // 無法載入圖片，代表 localhost 沒開
    console.warn('無法連接 localhost，開啟 GitHub 備用頁面');
    window.open(fallbackURL, '_blank', 'noopener,noreferrer');
  };

  // 嘗試載入 localhost 的圖示資源作為連線測試
  testImg.src = 'http://localhost/favicon.ico?' + new Date().getTime();
}



function openPingLocalGame() {
  showMessage('Button clicked: 前往 Ping local game');
  window.open('http://localhost/chatbot/keyboard_game/index.html', '_blank', 'noopener,noreferrer');
}

function openPingGitGame() {
  showMessage('Button clicked: 前往 Ping Git game');
  window.open('https://gsegria.github.io/XAMPP_SQL/keyboard_game/index.html', '_blank', 'noopener,noreferrer');
}