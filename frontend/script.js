const BACKEND_URL = "http://localhost:5000";


async function sendOTP() {

    const phone = document.getElementById("phone").value.trim();

    if (!phone) {
        alert("Please enter your mobile number.");
        return;
    }

    const response = await fetch(`${BACKEND_URL}/send-otp`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            phone
        })

    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
        document.getElementById("otpSection").style.display = "block";
    }

}

async function verifyOTP() {

    const phone = document.getElementById("phone").value.trim();
    const otp = document.getElementById("otp").value.trim();

    const response = await fetch(`${BACKEND_URL}/verify-otp`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            phone,
            otp
        })

    });

    const data = await response.json();

    if (data.success) {

        localStorage.setItem("token", data.token);

        window.location.href = "dashboard.html";

    } else {

        alert(data.message);

    }

}



async function loadDashboard() {

    if (!window.location.pathname.includes("dashboard.html")) {
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {

        window.location.href = "index.html";

        return;

    }

    try {

        const response = await fetch(`${BACKEND_URL}/dashboard`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        if (!data.success) {

            localStorage.removeItem("token");

            window.location.href = "index.html";

            return;

        }

        console.log("Authenticated User");

        console.log(data.user);

    } catch (err) {

        console.error(err);

        localStorage.removeItem("token");

        window.location.href = "index.html";

    }

}


function logout() {

    localStorage.removeItem("token");

    window.location.href = "index.html";

}


loadDashboard();