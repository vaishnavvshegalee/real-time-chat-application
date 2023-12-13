const socket = io();

let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");
let name;
do {
  name = prompt("Please Enter Your Name:");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});
function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  // Append Msg
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  //   send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markUp = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markUp;
  messageArea.appendChild(mainDiv);
}

// receive messages except
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
