// Get popup elements
const changePasswordBtn = document.getElementById("changePasswordBtn");
const passwordOverlay = document.getElementById("passwordOverlay");
const closePasswordModal = document.getElementById("closePasswordModal");

// Get form elements
const changePasswordForm = document.getElementById("changePasswordForm");
const currentPassword = document.getElementById("currentPassword");
const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");

const currentPasswordError = document.getElementById("currentPasswordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Open popup
changePasswordBtn.addEventListener("click", function () {
    passwordOverlay.style.display = "flex";
});

// Close popup
closePasswordModal.addEventListener("click", function () {
    passwordOverlay.style.display = "none";
});

// Close when clicking outside
passwordOverlay.addEventListener("click", function (event) {
    if (event.target === passwordOverlay) {
        passwordOverlay.style.display = "none";
    }
});

// Clear errors while typing
currentPassword.addEventListener("input", function () {
    currentPasswordError.textContent = "";
    currentPassword.classList.remove("input-error");
});

confirmNewPassword.addEventListener("input", function () {
    confirmPasswordError.textContent = "";
    confirmNewPassword.classList.remove("input-error");
});

// Change password
changePasswordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    currentPasswordError.textContent = "";
    confirmPasswordError.textContent = "";

    currentPassword.classList.remove("input-error");
    confirmNewPassword.classList.remove("input-error");

    const savedUser = JSON.parse(localStorage.getItem("thriftUser"));

    if (!savedUser) {
        alert("No account found. Please sign up first.");
        return;
    }

    // Check current password
    if (currentPassword.value !== savedUser.password) {
        currentPasswordError.textContent =
            "Incorrect current password. Please try again.";

        currentPassword.classList.add("input-error");
        return;
    }

    // Check if new password matches confirmation
    if (newPassword.value !== confirmNewPassword.value) {
        confirmPasswordError.textContent =
            "New passwords do not match. Please try again.";

        confirmNewPassword.classList.add("input-error");
        return;
    }

    // Prevent reusing the same password
    if (newPassword.value === currentPassword.value) {
        confirmPasswordError.textContent =
            "Please choose a password different from your current one.";
        return;
    }

    // Save the new password
    savedUser.password = newPassword.value;

    localStorage.setItem("thriftUser", JSON.stringify(savedUser));

    alert("Your password has been changed successfully!");

    changePasswordForm.reset();
    passwordOverlay.style.display = "none";
});