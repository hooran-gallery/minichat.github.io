const socket = io(
    "https://bak-mf27.onrender.com"
);

function sendMessage(){

    const text =
      document.getElementById("message").value;

    socket.emit(
      "chat-message",
      text
    );

    document.getElementById("message").value="";
}

socket.on(
  "chat-message",
  (msg)=>{

    document.getElementById("messages")
      .innerHTML +=
      `
      <div class="message">
        ${msg}
      </div>
      `;

  }
);
