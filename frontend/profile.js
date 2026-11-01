// Check whether the user is logged in
if (sessionStorage.getItem("thriftLoggedIn") !== "true") {

    window.location.href = "../frontend2/login.html";

} else {

    // Get the saved user information
    const savedUser = JSON.parse(localStorage.getItem("thriftUser"));

    if (savedUser) {
        document.getElementById("profileName").textContent = savedUser.name;
        document.getElementById("fullName").textContent = savedUser.name;
        document.getElementById("profileEmail").textContent = savedUser.email;
        document.getElementById("profilePhone").textContent = savedUser.phone;
    }

    // Edit Profile button
    const editButton = document.getElementById("editProfileBtn");
    const editForm = document.getElementById("editForm");

    editButton.addEventListener("click", function () {

      editForm.style.display = "flex";

        document.getElementById("editName").value = savedUser.name;
        document.getElementById("editPhone").value = savedUser.phone;
        document.getElementById("editAddress").value = savedUser.address || "";

    });
    // Save updated profile details
const saveButton = document.getElementById("saveProfileBtn");

saveButton.addEventListener("click", function () {

    const newName = document.getElementById("editName").value.trim();
    const newPhone = document.getElementById("editPhone").value.trim();
    const newAddress = document.getElementById("editAddress").value.trim();

    if (!newName || !newPhone || !newAddress) {
        alert("Please fill in all fields.");
        return;
    }

    // Update saved user information
    savedUser.name = newName;
    savedUser.phone = newPhone;
    savedUser.address = newAddress;

    localStorage.setItem("thriftUser", JSON.stringify(savedUser));

    // Update profile display
    document.getElementById("profileName").textContent = newName;
    document.getElementById("fullName").textContent = newName;
    document.getElementById("profilePhone").textContent = newPhone;

    editForm.style.display = "none";

    alert("Profile updated successfully!");
});

// Cancel editing
// Close popup using either Cancel button
document.getElementById("cancelEditBtn").addEventListener("click", closeEditForm);

document.getElementById("cancelEditBtn2").addEventListener("click", closeEditForm);

function closeEditForm() {
    editForm.style.display = "none";
}

    // Logout functionality
    const logoutButton = document.querySelector(".logout-btn");

    logoutButton.addEventListener("click", function () {

        sessionStorage.removeItem("thriftLoggedIn");
        sessionStorage.removeItem("thriftUserEmail");

        window.location.href = "home.html";
    });
}