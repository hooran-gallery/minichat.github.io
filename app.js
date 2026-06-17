const socket =
io("https://bak-mf27.onrender.com");

async function register() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if (!username || !password) {

        document.getElementById("result")
            .innerHTML =
            "نام کاربری و رمز را وارد کنید";

        return;
    }

    try {

        const response = await fetch(
            "https://bak-mf27.onrender.com/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data = await response.json();

        if(data.success){

            localStorage.setItem(
                "username",
                username
            );
        }

        document.getElementById("result")
            .innerHTML =
            data.message;

    } catch (err) {

        document.getElementById("result")
            .innerHTML =
            "خطا در ارتباط با سرور";
    }
}

function login(){

    const username =
        document.getElementById("username").value;

    if(!username){
        alert("نام کاربری را وارد کنید");
        return;
    }

    localStorage.setItem(
        "username",
        username
    );

    document.getElementById("result")
        .innerHTML =
        "وارد شدید";
}

function sendMessage(){

    const text =
        document.getElementById("message").value;

    if(!text) return;

    const username =
        localStorage.getItem("username") ||
        "مهمان";

    socket.emit(
        "send-message",
        {
            user: username,
            text: text,
            time: new Date().toLocaleTimeString()
        }
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
            <b>${msg.user}</b>
            <small>${msg.time}</small>
            <br>
            ${msg.text}
        </div>
        `;
    }
);
