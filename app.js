async function register(){

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const response =
        await fetch(
            "https://bak-mf27.onrender.com",
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

    document.getElementById("result")
        .innerHTML =
        data.message || "ثبت شد";
}
