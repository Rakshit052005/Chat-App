const socket = new WebSocket("ws://localhost:8081");

socket.addEventListener("open", () => {
  console.log("Connected to WebSocket server ✅");
});

document.getElementById("send-button").addEventListener("click", sendMessage);

function sendMessage() {
  const userInput = document.getElementById("input-box").value;

  // Send as raw string; backend does the wrapping
  socket.send(userInput.trim());

  // UI update
  const chatLog = document.getElementById("chat-log");
  const msgDiv = document.createElement("div");
  msgDiv.textContent = `🧑 You: ${userInput}`;
  chatLog.appendChild(msgDiv);
}

socket.addEventListener("message", event => {
  const chatLog = document.getElementById("chat-log");
  const replyDiv = document.createElement("div");
  replyDiv.textContent = `🤖 AI: ${event.data}`;
  chatLog.appendChild(replyDiv);
});
