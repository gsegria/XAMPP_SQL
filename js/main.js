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

function openResume(){ window.open('resume.html','_blank'); }
function open_master_thesis(){ window.open('https://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi?o=dnclcdr&s=id=%22105MHIT1428007%22.&searchmode=basic','_blank'); }
function openSelfIntroduce(){ window.open('https://www.notion.so/99-Resume-English-33105a5cf4308002ad8ece8c5b070f32?source=copy_link','_blank'); }

function open104Home(){ window.open('https://www.104.com.tw','_blank'); }
function openPingHsu104(){ window.open('https://pda.104.com.tw/profile/share/i9p7o9aqK0Id36O7LxI43bJF2DM8ti4b','_blank'); }
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

function loadSection(id, url) {
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`無法載入 ${url}`);
      return res.text();
    })
    .then(data => {
      const container = document.getElementById(id);
      if (!container) return;

      container.innerHTML = data;
      container.offsetHeight;

      // ✅ ⭐ 新增：只對 dart / rock5b_plus 套 table style
      if (id === 'section-dart' || id === 'section-rock_5b_plus') {
        const tables = container.querySelectorAll('table');

        tables.forEach(table => {
          table.classList.add('nice-table');
        });
      }

      // ✅ Python 圖片 debug（保留）
      if (id === 'section-python') {
        const imgs = document.querySelectorAll('.denoise-table img');
        imgs.forEach(img => {
          if (img.complete) {
            printStyle(img);
          } else {
            img.addEventListener('load', () => printStyle(img));
          }
        });
      }
    })
    .catch(err => {
      console.error(err);
      const el = document.getElementById(id);
      if (el) el.innerHTML = '載入失敗';
    });
}

// 工具函數
function printStyle(img) {
  const style = window.getComputedStyle(img);
  console.log(`Image src: ${img.src}`);
  console.log('Width:', style.width);
  console.log('Height:', style.height);
  console.log('Margin:', style.margin);
  console.log('Border radius:', style.borderRadius);
}

document.addEventListener("DOMContentLoaded", () => {
  // 判斷是否在 localhost
  const isLocal = window.location.hostname === "localhost";

  // 定義各 section 的 URL，根據環境切換
  const sections = {
    "section-python": isLocal
      ? "http://localhost/chatbot/sections/01_python.html"
      : "https://gsegria.github.io/XAMPP_SQL/sections/01_python.html",

    "section-rock_5b_plus": isLocal
      ? "http://localhost/chatbot/sections/02_rock5b_plus.html"
      : "https://gsegria.github.io/XAMPP_SQL/sections/02_rock5b_plus.html",

    "section-medicine": isLocal
      ? "http://localhost/chatbot/sections/03_medicine.html"
      : "https://gsegria.github.io/XAMPP_SQL/sections/03_medicine.html",

    "section-npm": isLocal
      ? "http://localhost/chatbot/sections/04_npm.html"
      : "https://gsegria.github.io/XAMPP_SQL/sections/04_npm.html",

    "section-stm32": isLocal
      ? "http://localhost/chatbot/sections/05_STM32_IDE.html"
      : "https://gsegria.github.io/XAMPP_SQL/sections/05_STM32_IDE.html",

    "section-dart": isLocal
      ? "http://localhost/chatbot/sections/06_dark.html"
      : "https://gsegria.github.io/XAMPP_SQL/sections/06_dark.html",

    "section-xmapp": isLocal
      ? "http://localhost/chatbot/sections/07_xmapp.html"
      : "https://gsegria.github.io/XAMPP_SQL/sections/07_xmapp.html",

    "section-certificate": isLocal
      ? "http://localhost/chatbot/sections/08_certificate.html"
      : "https://gsegria.github.io/XAMPP_SQL/sections/08_certificate.html"
  };

  // 自動載入所有 section
  for (const [sectionId, url] of Object.entries(sections)) {
    loadSection(sectionId, url);
  }
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



// 外部按鈕