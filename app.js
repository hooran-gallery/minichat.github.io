const socket =
io("https://bak-mf27.onrender.com");

function sendMessage(){

    const text =
    document.getElementById("message").value;

    if(!text) return;

    socket.emit(
        "send-message",
        text
    );

    document.getElementById("message").value="";
}

socket.on(
    "new-message",
    (msg)=>{

        document.getElementById("messages")
        .innerHTML +=
        `
        <div class="msg">
            ${msg}
        </div>
        `;
    }
);
async function login() {

    const username =
        document.getElementById("username").value;

    localStorage.setItem(
        "username",
        username
    );

    document.getElementById("result")
        .innerHTML =
        "وارد شدید";
}
