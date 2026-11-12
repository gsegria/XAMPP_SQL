// chatbot.js
// PingBot - Gemini API
const API_BASE_URL = "https://pingbot-ai.onrender.com";

const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

function appendMessage(text, who = "bot") {
    const div = document.createElement("div");
    div.className = "msg " + (who === "user" ? "user-msg" : "bot-msg");
    div.textContent = text;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function clearChat() {
    chatbox.innerHTML = "";
    userInput.value = "";
    appendMessage("對話已清除，可以重新開始！");
}

async function sendMessage() {
    const message = userInput.value.trim();

    if (!message || userInput.disabled) return;

    appendMessage(message, "user");
    userInput.value = "";
    userInput.disabled = true;

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

        appendMessage(reply);

    } catch (error) {
        appendMessage(`❌ 錯誤：${error.message}`);

    } finally {
        userInput.disabled = false;
        userInput.focus();
    }
}

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

appendMessage("PingBot Gemini AI 已就緒，可以開始聊天！");
