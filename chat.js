const input = document.getElementById("chat-input");
const button = document.getElementById("send-button");
const display = document.getElementById("chat-display");

const API_KEY = "";

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.textContent = userMessage;
  display.appendChild(userDiv);
  display.scrollTop = display.scrollHeight;
  input.value = "";

  // Placeholder for bot reply
  const replyDiv = document.createElement("div");
  replyDiv.textContent = "";
  display.appendChild(replyDiv);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{role: "developer", content: ""},{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    replyDiv.textContent += data.choices[0].message.content;
    display.scrollTop = display.scrollHeight;

}

button.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
