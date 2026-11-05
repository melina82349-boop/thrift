
const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberMe = document.querySelector(".login-options input[type='checkbox']");

// Load remembered email or phone
const rememberedUser = localStorage.getItem("thriftRememberedUser");

if (rememberedUser) {
    emailInput.value = rememberedUser;
    rememberMe.checked = true;
}
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const togglePassword = document.getElementById("togglePassword");

// SHOW / HIDE PASSWORD
togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        togglePassword.setAttribute("aria-label", "Hide password");
    } else {
        passwordInput.type = "password";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
        togglePassword.setAttribute("aria-label", "Show password");
    }

});

// CLEAR ERROR
function clearError(input, errorElement) {
    input.classList.remove("input-error");
    errorElement.textContent = "";
}

// SHOW ERROR
function showError(input, errorElement, message) {
    input.classList.add("input-error");
    errorElement.textContent = message;
}

// Remove errors while typing
emailInput.addEventListener("input", function () {
    clearError(emailInput, emailError);
});

passwordInput.addEventListener("input", function () {
    clearError(passwordInput, passwordError);
});

// LOGIN FORM
loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const emailOrPhone = emailInput.value.trim();
    const password = passwordInput.value;

    // Clear previous errors
    clearError(emailInput, emailError);
    clearError(passwordInput, passwordError);

    // Get registered account
    let savedUser;

    try {
        savedUser = JSON.parse(localStorage.getItem("thriftUser"));
    } catch (error) {
        savedUser = null;
    }

    // Check account existence
    if (!savedUser) {
        showError(
            emailInput,
            emailError,
            "No account found. Please sign up first."
        );
        return;
    }

    // Check email or phone number
    const emailMatches =
        emailOrPhone.toLowerCase() ===
        String(savedUser.email || "").toLowerCase();

    const phoneMatches =
        emailOrPhone === String(savedUser.phone || "");

    if (!emailMatches && !phoneMatches) {
        showError(
            emailInput,
            emailError,
            "Incorrect email or phone number."
        );
        return;
    }

    // Check password
    if (password !== savedUser.password) {
        showError(
            passwordInput,
            passwordError,
            "Incorrect password. Please try again."
        );
        return;
    }

    // LOGIN SUCCESSFUL
    sessionStorage.setItem("thriftLoggedIn", "true");
    sessionStorage.setItem("thriftUserEmail", savedUser.email);
// Remember user preference
if (rememberMe.checked) {
    localStorage.setItem("thriftRememberedUser", emailOrPhone);
} else {
    localStorage.removeItem("thriftRememberedUser");
}
    // Show success notification
    const successToast = document.getElementById("successToast");
    const successText = document.getElementById("successText");

    successText.textContent =
        `Good to see you again, ${savedUser.name}!`;

    successToast.classList.add("show");

   // Redirect after 2 seconds
    setTimeout(function () {
        window.location.href = "../frontend/pages/home.html";
    }, 500);
});
