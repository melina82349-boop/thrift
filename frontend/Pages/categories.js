/* =========================================================
   THRIFT - CATEGORIES PAGE FILTERING SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const categoryGrid = document.getElementById("categoryProductGrid") || document.getElementById("productGrid");

    // 1. Load user-uploaded items from localStorage and append them to the category page if needed
    const savedProducts = JSON.parse(localStorage.getItem("thrift_products")) || [];
    
    if (categoryGrid && savedProducts.length > 0) {
        let dynamicHTML = "";
        savedProducts.forEach(product => {
            dynamicHTML += `
                <div class="product-card" data-category="${product.category.toLowerCase()}" style="display: block;">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p class="price">Rs. ${product.price.toLocaleString()}</p>
                    <a href="product-details.html?id=${product.id}" class="details-btn">View Details</a>
                </div>
            `;
        });
        categoryGrid.insertAdjacentHTML("afterbegin", dynamicHTML);
    }

    // 2. Check URL parameters on page load (e.g., categories.html?cat=electronics)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get("cat");

    if (selectedCategory) {
        filterByCategory(selectedCategory.toLowerCase());
    }

    // 3. Function to filter product cards based on category
    function filterByCategory(categoryName) {
        const productCards = document.querySelectorAll(".product-card");

        productCards.forEach(card => {
            const productCategory = (card.getAttribute("data-category") || "").toLowerCase();

            if (categoryName === "all" || productCategory === categoryName) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // 4. Optional: Listen for clicks on category buttons/links if you have them on the page
    const categoryButtons = document.querySelectorAll(".category-btn, .category-link");
    categoryButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const cat = this.getAttribute("data-category");
            if (cat) {
                filterByCategory(cat.toLowerCase());
            }
        });
    });
});