const socket =
io("https://bak-mf27.onrender.com");

loadMessages();

function loadProfile(){

const username =
localStorage.getItem("username");

if(username){

document.getElementById(
"currentUser"
).innerHTML =
username;

socket.emit(
"user-online",
username
);

}
}

loadProfile();

async function register(){

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;

const response =
await fetch(
"https://bak-mf27.onrender.com/register",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username,
password
})
}
);

const data =
await response.json();

alert(data.message);
}

async function login(){

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;

const response =
await fetch(
"https://bak-mf27.onrender.com/login",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username,
password
})
}
);

const data =
await response.json();

if(data.success){

localStorage.setItem(
"username",
data.username
);

loadProfile();

alert("ورود موفق");
}
else{

alert(data.message);
}
}

function logout(){

localStorage.removeItem(
"username"
);

location.reload();
}

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

<b>${msg.username || msg.user}</b>

<br>

${msg.message || msg.text}

<br>

<small>
${msg.time}
</small>

</div>
`;
}

function sendMessage(){

const username =
localStorage.getItem("username");

if(!username){

alert("ابتدا وارد شوید");

return;
}

const text =
document.getElementById("message").value;

if(!text) return;

socket.emit(
"send-message",
{
user:username,
text:text,
time:new Date().toLocaleTimeString()
}
);

document.getElementById(
"message"
).value="";
}

socket.on(
"new-message",
(msg)=>{
showMessage(msg);
}
);

socket.on(
"online-users",
(users)=>{

document.getElementById(
"onlineUsers"
).innerHTML =
users.map(
u=>`🟢 ${u}`
).join("<br>");

}
);
 
