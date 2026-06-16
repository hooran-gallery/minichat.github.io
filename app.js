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

        document.getElementById("result")
            .innerHTML =
            data.message;

    } catch (err) {

        document.getElementById("result")
            .innerHTML =
            "خطا در ارتباط با سرور";

        console.log(err);
    }
}
