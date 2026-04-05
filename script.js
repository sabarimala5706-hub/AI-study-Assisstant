// Load chat when page opens
window.onload = function () {
    loadChat();
};

function saveMessage(role, text) {
    let chat = JSON.parse(localStorage.getItem("chat")) || [];

    chat.push({ role, text });

    localStorage.setItem("chat", JSON.stringify(chat));
}

function loadChat() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    let chat = JSON.parse(localStorage.getItem("chat")) || [];

    chat.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message " + msg.role;
        div.innerText = msg.text;
        chatBox.appendChild(div);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function askAI() {
    const questionInput = document.getElementById("question");
    const chatBox = document.getElementById("chat-box");

    const question = questionInput.value;

    if (!question) return;

    // Show user message
    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.innerText = question;
    chatBox.appendChild(userMsg);

    saveMessage("user", question);

    questionInput.value = "";

    try {
        const res = await fetch("http://localhost:5000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question })
        });

        const data = await res.json();

        // Show AI message
        const aiMsg = document.createElement("div");
        aiMsg.className = "message ai";
        aiMsg.innerText = data.answer;
        chatBox.appendChild(aiMsg);

        saveMessage("ai", data.answer);

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error(error);
    }
}
function clearChat() {
    localStorage.removeItem("chat");
    loadChat();
}