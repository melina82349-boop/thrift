
// LOGIN PROTECTION
if (sessionStorage.getItem("thriftLoggedIn") !== "true") {
    window.location.href = "../frontend2/login.html";
} else {

    let savedUser = JSON.parse(localStorage.getItem("thriftUser")) || {};

    // PROFILE ELEMENTS
    const profileName = document.getElementById("profileName");
    const fullName = document.getElementById("fullName");
    const profileEmail = document.getElementById("profileEmail");
    const profilePhone = document.getElementById("profilePhone");
    const profileAddress = document.getElementById("profileAddress");

    // PHOTO ELEMENTS
    const profileImage = document.getElementById("profileImage");
    const defaultProfileIcon = document.getElementById("defaultProfileIcon");
    const profilePhotoInput = document.getElementById("profilePhotoInput");

    const photoModal = document.getElementById("photoModal");
    const changePhotoBtn = document.getElementById("changePhotoBtn");
    const closePhotoModal = document.getElementById("closePhotoModal");
    const galleryOption = document.getElementById("galleryOption");
    const cameraOption = document.getElementById("cameraOption");

    // CAMERA ELEMENTS
    const cameraModal = document.getElementById("cameraModal");
    const cameraPreview = document.getElementById("cameraPreview");
    const photoCanvas = document.getElementById("photoCanvas");
    const cameraStatus = document.getElementById("cameraStatus");
    const closeCamera = document.getElementById("closeCamera");
    const capturePhoto = document.getElementById("capturePhoto");
    const usePhoto = document.getElementById("usePhoto");
    const retakePhoto = document.getElementById("retakePhoto");

    let cameraStream = null;
    let capturedPhoto = null;

    // NOTIFICATION ELEMENTS
    const customToast = document.getElementById("customToast");
    const toastTitle = document.getElementById("toastTitle");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");
    const closeToast = document.getElementById("closeToast");

    let toastTimer;

    // CUSTOM NOTIFICATION
    function showToast(title, message, type = "success") {
        clearTimeout(toastTimer);

        toastTitle.textContent = title;
        toastMessage.textContent = message;

        if (type === "error") {
            toastIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
            toastIcon.style.background = "#FFF0ED";
            toastIcon.style.color = "#B94A36";
        } else {
            toastIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
            toastIcon.style.background = "#E6F0E9";
            toastIcon.style.color = "#064E3B";
        }

        customToast.classList.add("show");

        toastTimer = setTimeout(() => {
            customToast.classList.remove("show");
        }, 3500);
    }

    closeToast.addEventListener("click", function () {
        clearTimeout(toastTimer);
        customToast.classList.remove("show");
    });

    // DISPLAY PROFILE
    function displayProfile() {
        profileName.textContent = savedUser.name || "Your Name";
        fullName.textContent = savedUser.name || "Your Name";
        profileEmail.textContent = savedUser.email || "your@email.com";
        profilePhone.textContent = savedUser.phone || "Not added";
        profileAddress.textContent = savedUser.address || "Not added";

        if (savedUser.profilePhoto) {
            profileImage.src = savedUser.profilePhoto;
            profileImage.style.display = "block";
            defaultProfileIcon.style.display = "none";
        } else {
            profileImage.style.display = "none";
            profileImage.removeAttribute("src");
            defaultProfileIcon.style.display = "block";
        }
    }

    displayProfile();

    // PHOTO SELECTION MODAL
    changePhotoBtn.addEventListener("click", function () {
        photoModal.style.display = "flex";
    });

    function closePhotoSelection() {
        photoModal.style.display = "none";
    }

    closePhotoModal.addEventListener("click", closePhotoSelection);

    photoModal.addEventListener("click", function (event) {
        if (event.target === photoModal) {
            closePhotoSelection();
        }
    });

    // GALLERY OPTION
    galleryOption.addEventListener("click", function () {
        profilePhotoInput.removeAttribute("capture");
        profilePhotoInput.click();
    });

    // OPEN CAMERA
    cameraOption.addEventListener("click", async function () {

        closePhotoSelection();
        cameraModal.style.display = "flex";

        cameraStatus.textContent = "Requesting camera permission...";
        capturePhoto.hidden = true;
        usePhoto.hidden = true;
        retakePhoto.hidden = true;
        cameraPreview.style.display = "block";

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            cameraStatus.textContent = "Camera is unavailable. Open this page using localhost or HTTPS.";
            showToast("Camera Unavailable", "Please use localhost or a secure HTTPS connection.", "error");
            return;
        }

        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user"
                },
                audio: false
            });

            cameraPreview.srcObject = cameraStream;
            await cameraPreview.play();

            cameraStatus.textContent = "Camera is ready! Look at the camera.";
            capturePhoto.hidden = false;

        } catch (error) {
            console.error("Camera error:", error);

            if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                cameraStatus.textContent = "Camera access was denied. Allow camera permission in your browser settings.";
                showToast("Permission Needed", "Please allow camera access to continue.", "error");
            } else if (error.name === "NotFoundError") {
                cameraStatus.textContent = "No camera was found on this device.";
                showToast("Camera Not Found", "Connect or use a device with a camera.", "error");
            } else {
                cameraStatus.textContent = "Unable to start the camera. Please try again.";
                showToast("Camera Error", "We couldn't open your camera.", "error");
            }
        }
    });

    // STOP CAMERA
    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }

        cameraPreview.srcObject = null;
    }

    // CAPTURE PHOTO
    capturePhoto.addEventListener("click", function () {

        if (!cameraStream) return;

        const videoWidth = cameraPreview.videoWidth;
        const videoHeight = cameraPreview.videoHeight;

        if (!videoWidth || !videoHeight) {
            showToast("Camera Not Ready", "Please wait a moment and try again.", "error");
            return;
        }

        photoCanvas.width = videoWidth;
        photoCanvas.height = videoHeight;

        const context = photoCanvas.getContext("2d");

        // Mirror front camera image
        context.translate(videoWidth, 0);
        context.scale(-1, 1);
        context.drawImage(cameraPreview, 0, 0, videoWidth, videoHeight);

        capturedPhoto = photoCanvas.toDataURL("image/jpeg", 0.85);

        cameraPreview.style.display = "none";
        cameraStatus.textContent = "Looking good! Would you like to use this photo?";

        capturePhoto.hidden = true;
        usePhoto.hidden = false;
        retakePhoto.hidden = false;

        stopCamera();
    });

    // RETAKE PHOTO
    retakePhoto.addEventListener("click", function () {
        capturedPhoto = null;
        cameraOption.click();
    });

    // USE CAPTURED PHOTO
    usePhoto.addEventListener("click", function () {

        if (!capturedPhoto) return;

        try {
            savedUser.profilePhoto = capturedPhoto;
            localStorage.setItem("thriftUser", JSON.stringify(savedUser));

            displayProfile();

            capturedPhoto = null;
            closeCameraScreen();

            showToast("Photo Updated!", "Your new profile photo looks great.");

        } catch (error) {
            showToast("Unable to Save", "Your browser storage may be full.", "error");
        }
    });

    // CLOSE CAMERA
    function closeCameraScreen() {
        stopCamera();

        cameraModal.style.display = "none";
        cameraPreview.style.display = "block";

        capturedPhoto = null;
    }

    closeCamera.addEventListener("click", closeCameraScreen);

    cameraModal.addEventListener("click", function (event) {
        if (event.target === cameraModal) {
            closeCameraScreen();
        }
    });

    // GALLERY PHOTO UPLOAD
    profilePhotoInput.addEventListener("change", function () {

        const file = profilePhotoInput.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            showToast("Invalid Photo", "Please select a valid image.", "error");
            profilePhotoInput.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            showToast("Photo Too Large", "Please choose an image smaller than 2 MB.", "error");
            profilePhotoInput.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            try {
                savedUser.profilePhoto = event.target.result;
                localStorage.setItem("thriftUser", JSON.stringify(savedUser));

                displayProfile();
                closePhotoSelection();

                showToast("Photo Updated!", "Your new profile photo looks great.");
            } catch (error) {
                showToast("Unable to Save", "Your browser storage may be full.", "error");
            }

            profilePhotoInput.value = "";
        };

        reader.onerror = function () {
            showToast("Upload Failed", "Something went wrong while reading your photo.", "error");
            profilePhotoInput.value = "";
        };

        reader.readAsDataURL(file);
    });

    // DASHBOARD STATISTICS
    const totalOrders = Number(localStorage.getItem("totalOrders")) || 0;
    const productsSold = Number(localStorage.getItem("productsSold")) || 0;
    const totalIncome = Number(localStorage.getItem("totalIncome")) || 0;

    document.getElementById("totalOrders").textContent = totalOrders;
    document.getElementById("productsSold").textContent = productsSold;
    document.getElementById("totalIncome").textContent =
        "Rs. " + totalIncome.toLocaleString("en-IN");

    // EDIT PROFILE
    const editButton = document.getElementById("editProfileBtn");
    const editForm = document.getElementById("editForm");

    const editName = document.getElementById("editName");
    const editPhone = document.getElementById("editPhone");
    const editAddress = document.getElementById("editAddress");

    editButton.addEventListener("click", function () {
        editName.value = savedUser.name || "";
        editPhone.value = savedUser.phone || "";
        editAddress.value = savedUser.address || "";

        editForm.style.display = "flex";
    });

    // SAVE PROFILE CHANGES
    const saveButton = document.getElementById("saveProfileBtn");

    saveButton.addEventListener("click", function () {

        const newName = editName.value.trim();
        const newPhone = editPhone.value.trim();
        const newAddress = editAddress.value.trim();

        if (!newName || !newPhone || !newAddress) {
            showToast("Missing Information", "Please fill in all fields.", "error");
            return;
        }

        savedUser.name = newName;
        savedUser.phone = newPhone;
        savedUser.address = newAddress;

        try {
            localStorage.setItem("thriftUser", JSON.stringify(savedUser));

            displayProfile();
            editForm.style.display = "none";

            showToast("Profile Updated!", "Your account details have been saved.");
        } catch (error) {
            showToast("Unable to Save", "Please try again.", "error");
        }
    });

    // CLOSE EDIT MODAL
    function closeEditForm() {
        editForm.style.display = "none";
    }

    document.getElementById("cancelEditBtn").addEventListener("click", closeEditForm);
    document.getElementById("cancelEditBtn2").addEventListener("click", closeEditForm);

    editForm.addEventListener("click", function (event) {
        if (event.target === editForm) {
            closeEditForm();
        }
    });

    // LOGOUT
    const logoutButton = document.querySelector(".logout-btn");

    logoutButton.addEventListener("click", function () {
        stopCamera();

        sessionStorage.removeItem("thriftLoggedIn");
        sessionStorage.removeItem("thriftUserEmail");

        window.location.href = "home.html";
    });
}
