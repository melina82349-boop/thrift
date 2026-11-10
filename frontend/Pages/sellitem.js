/* =========================================================
   THRIFT - SELL ITEM FORM SUBMISSION SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm"); // Make sure your form has id="productForm"
    
    const inputTitle = document.getElementById("title");
    const inputCategory = document.getElementById("category");
    const inputDescription = document.getElementById("description");
    const inputPrice = document.getElementById("price");
    const inputLocation = document.getElementById("location");
    const inputNegotiable = document.getElementById("negotiable");
    const previewImage = document.getElementById("previewImage"); // Your image preview element or Base64 string

    if (!productForm) return;

    productForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get selected condition (if using radio buttons)
        const selectedCond = document.querySelector('input[name="condition"]:checked');

        // Build the product object
        const newProduct = {
            id: Date.now(),
            title: inputTitle.value.trim(),
            category: inputCategory.value,
            description: inputDescription.value.trim(),
            price: parseFloat(inputPrice.value) || 0,
            location: inputLocation.value,
            condition: selectedCond ? selectedCond.value : 'Good',
            negotiable: inputNegotiable ? inputNegotiable.checked : false,
            image: previewImage ? previewImage.src : '../images/bannerimage.jpg',
            createdAt: new Date().toISOString()
        };

        // Retrieve existing products or initialize empty array
        const existingProducts = JSON.parse(localStorage.getItem("thrift_products")) || [];

        // Add the new product to the front of the array so it appears first on the homepage
        existingProducts.unshift(newProduct);

        // Save back to localStorage
        localStorage.setItem("thrift_products", JSON.stringify(existingProducts));

        // Success feedback and redirect to home
        alert("Item listed successfully!");
        window.location.href = "home.html";
    });
});