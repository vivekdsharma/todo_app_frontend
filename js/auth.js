const API_URL = "https://todo-app-backend-rcu5.onrender.com"; // Backend API URL

let isLogin = false; // Default: Signup Form

// ✅ Toggle between Signup & Login Forms
function toggleForm() {
    isLogin = !isLogin; // Switch state

    if (isLogin) {
        document.getElementById("form-title").innerText = "Login";
        document.getElementById("signup-fields").style.display = "none";
        document.getElementById("submit-btn").innerText = "Login";
        document.getElementById("submit-btn").setAttribute("onclick", "login()");
        document.getElementById("form-footer").innerHTML = "Don't have an account?";
        document.getElementById("toggle-form").innerText = "Signup";
        document.getElementById("heading_left").innerText = "Welcome Back";
        document.getElementById("para_left").innerText = "Nice to see you again";
    } else {
        document.getElementById("form-title").innerText = "Signup";
        document.getElementById("signup-fields").style.display = "block";
        document.getElementById("submit-btn").innerText = "Signup";
        document.getElementById("submit-btn").setAttribute("onclick", "signup()");
        document.getElementById("form-footer").innerHTML = "Already have an account?";
        document.getElementById("toggle-form").innerText = "Login";
        document.getElementById("heading_left").innerText = "Welcome aboard!";
        document.getElementById("para_left").innerText = "Let's make something great together.";
    }
}

// ✅ Signup Function (Updated API path)
async function signup() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !phone || !email || !password) {
        document.getElementById("message").innerText = "All fields are required!";
        return;
    }

    const response = await fetch(`${API_URL}/api/auth/signup`, { // 🔹 Updated path
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, password })
    });

    const data = await response.json();
    document.getElementById("message").innerText = data.message;

    if (response.ok) {
        alert("Signup successful! Please login.");
        toggleForm(); // Switch to Login mode after successful signup
    }
}

// ✅ Login Function (Updated API path)
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        document.getElementById("message").innerText = "Please enter Email & Password!";
        return;
    }

    const response = await fetch(`${API_URL}/api/auth/login`, { // 🔹 Updated path
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html"; // Redirect to Dashboard
    } else {
        document.getElementById("message").innerText = data.message;
    }
}

// ✅ Logout Function
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html"; // Redirect to Login page
}
