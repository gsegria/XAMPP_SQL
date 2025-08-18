// chatbot.js
const chatbox = document.getElementById('chatbox');

function appendMessage(text, who='bot'){
  const div = document.createElement('div');
  div.className = 'msg ' + (who==='user'?'user-msg':'bot-msg');
  div.textContent = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function clearChat(){ chatbox.innerHTML=''; document.getElementById('userInput').value=''; }

function sendMessage(){
  const input = document.getElementById('userInput');
  const val = input.value.trim();
  if(!val) return;
  appendMessage(val,'user');
  input.value='';
  setTimeout(()=>{
    const low = val.toLowerCase();
    if(low.includes('hi')||low.includes('哈囉')) appendMessage('哈囉！我是 PingBot，有什麼可以幫你？');
    else appendMessage('我收到：「'+val+'」。這裡可以接真實後端回覆。');
  },500);
}

document.getElementById('userInput').addEventListener('keydown',e=>{
  if(e.key==='Enter'){e.preventDefault();sendMessage();}
});

// 初始化
appendMessage('PingBot 已就緒 — 可以輸入問題或說「哈囉」試試看！');
