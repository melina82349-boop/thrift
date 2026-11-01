
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Get the registered account
    const savedUser = JSON.parse(localStorage.getItem("thriftUser"));

    // Check whether an account exists
    if (!savedUser) {
        alert("No account found. Please sign up first.");
        return;
    }

    // Verify email and password
    if (
        email !== savedUser.email ||
        password !== savedUser.password
    ) {
        alert("Incorrect email or password. Please try again.");
        return;
    }

    // Login successful
    sessionStorage.setItem("thriftLoggedIn", "true");
    sessionStorage.setItem("thriftUserEmail", savedUser.email);

    alert("Login successful! Welcome to THRIFT.");

    // Open profile
    window.location.href = "../frontend/profile.html";
});
