
// Select the sign-up form
const signupForm = document.getElementById("signupForm");

// Listen for form submission
signupForm.addEventListener("submit", function(event) {

    // Stop the form from refreshing the page
    event.preventDefault();

    // Get values from input fields
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if any field is empty
    if (!name || !email || !phone || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    // Check password length
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    // Check whether passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

  // Save temporary account details
const user = {
    name: name,
    email: email,
    phone: phone,
    password: password
};

localStorage.setItem("thriftUser", JSON.stringify(user));

alert("Account created successfully! Please log in.");

window.location.href = "login.html";

});

function togglePassword(fieldId, button) {
    const passwordInput = document.getElementById(fieldId);
    const eyeIcon = button.querySelector("i");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}
