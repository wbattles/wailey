const input = document.getElementById("chat-input");
const button = document.getElementById("send-button");
const display = document.getElementById("chat-display");
const apiKeyInput = document.getElementById("api-key-input");

async function sendMessage() {
  const userMessage = input.value.trim();
  const apiKey = apiKeyInput.value.trim();
  
  if (!userMessage) return;
  if (!apiKey) {
    alert("Please enter your API key first");
    return;
  }

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
        "Authorization": `Bearer ${apiKey}`
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
