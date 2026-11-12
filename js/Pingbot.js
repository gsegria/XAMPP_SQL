const API_BASE_URL = "https://pingbot-ai.onrender.com";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const message = input.value.trim();

  if (!message) return;

  // 顯示訊息，使用 textContent 避免 HTML 注入
  function addMessage(className, text) {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = text;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  addMessage("user-msg", `👤 ${message}`);
  input.value = "";
  input.disabled = true;

  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    const reply = data.reply ?? data.response ?? data.text;

    if (!reply) {
      throw new Error("API 沒有回傳有效的回答");
    }

    addMessage("bot-msg", `🤖 ${reply}`);

  } catch (error) {
    addMessage("bot-msg", `❌ 錯誤：${error.message}`);
  } finally {
    input.disabled = false;
    input.focus();
  }
}
