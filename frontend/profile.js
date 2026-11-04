
// Check whether the user is logged in
if (sessionStorage.getItem("thriftLoggedIn") !== "true") {
    window.location.href = "../frontend2/login.html";
} else {

    // Get saved user information
    let savedUser = JSON.parse(localStorage.getItem("thriftUser")) || {};

    // Profile display elements
    const profileName = document.getElementById("profileName");
    const fullName = document.getElementById("fullName");
    const profileEmail = document.getElementById("profileEmail");
    const profilePhone = document.getElementById("profilePhone");
    const profileAddress = document.getElementById("profileAddress");

    // Display saved information
    function displayProfile() {
        profileName.textContent = savedUser.name || "Your Name";
        fullName.textContent = savedUser.name || "Your Name";
        profileEmail.textContent = savedUser.email || "your@email.com";
        profilePhone.textContent = savedUser.phone || "Not added";
        profileAddress.textContent = savedUser.address || "Not added";
    }

    displayProfile();

    // Load dashboard statistics
    const totalOrders = Number(localStorage.getItem("totalOrders")) || 0;
    const productsSold = Number(localStorage.getItem("productsSold")) || 0;
    const totalIncome = Number(localStorage.getItem("totalIncome")) || 0;

    document.getElementById("totalOrders").textContent = totalOrders;
    document.getElementById("productsSold").textContent = productsSold;
    document.getElementById("totalIncome").textContent =
        "Rs. " + totalIncome.toLocaleString("en-IN");

    // Edit profile modal
    const editButton = document.getElementById("editProfileBtn");
    const editForm = document.getElementById("editForm");

    const editName = document.getElementById("editName");
    const editPhone = document.getElementById("editPhone");
    const editAddress = document.getElementById("editAddress");

    // Open modal
    editButton.addEventListener("click", function () {
        editName.value = savedUser.name || "";
        editPhone.value = savedUser.phone || "";
        editAddress.value = savedUser.address || "";

        editForm.style.display = "flex";
    });

    // Save profile changes
    const saveButton = document.getElementById("saveProfileBtn");

    saveButton.addEventListener("click", function () {

        const newName = editName.value.trim();
        const newPhone = editPhone.value.trim();
        const newAddress = editAddress.value.trim();

        if (!newName || !newPhone || !newAddress) {
            alert("Please fill in all fields.");
            return;
        }

        savedUser.name = newName;
        savedUser.phone = newPhone;
        savedUser.address = newAddress;

        localStorage.setItem("thriftUser", JSON.stringify(savedUser));

        displayProfile();

        editForm.style.display = "none";

        alert("Profile updated successfully!");
    });

    // Close modal
    function closeEditForm() {
        editForm.style.display = "none";
    }

    document.getElementById("cancelEditBtn").addEventListener("click", closeEditForm);
    document.getElementById("cancelEditBtn2").addEventListener("click", closeEditForm);

    // Close modal by clicking outside it
    editForm.addEventListener("click", function (event) {
        if (event.target === editForm) {
            closeEditForm();
        }
    });

    // Logout
    const logoutButton = document.querySelector(".logout-btn");

    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem("thriftLoggedIn");
        sessionStorage.removeItem("thriftUserEmail");

        window.location.href = "home.html";
    });
}
