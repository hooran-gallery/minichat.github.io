const socket =
io("https://bak-mf27.onrender.com");

loadMessages();

async function loadMessages(){

    const response =
        await fetch(
            "https://bak-mf27.onrender.com/messages"
        );

    const messages =
        await response.json();

    messages.forEach(showMessage);
}

function showMessage(msg){

    document.getElementById("messages")
        .innerHTML +=
        `
        <div class="msg">
            <b>${msg.user}</b>
            <small>${msg.time}</small>
            <br>
            ${msg.text}
        </div>
        `;
}

function sendMessage(){

    const text =
        document.getElementById("message").value;

    if(!text) return;

    const username =
        localStorage.getItem("username")
        || "مهمان";

    socket.emit(
        "send-message",
        {
            user:username,
            text:text,
            time:new Date().toLocaleTimeString()
        }
    );

    document.getElementById("message").value="";
}
function loadProfile(){

    const username =
        localStorage.getItem("username");

    if(username){

        document.getElementById(
            "currentUser"
        ).innerHTML =
        "👤 " + username;

    }else{

        document.getElementById(
            "currentUser"
        ).innerHTML =
        "مهمان";
    }
}

function logout(){

    localStorage.removeItem(
        "username"
    );

    alert("از حساب خارج شدید");

    location.reload();
}
socket.on(
    "new-message",
    (msg)=>{
        showMessage(msg);
    }
);
loadProfile();
