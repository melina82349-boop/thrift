/* =========================================================
   THRIFT - CATEGORIES PAGE FILTERING SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const categoryGrid = document.getElementById("categoryProductGrid") || document.getElementById("productGrid");

    // 1. Load user-uploaded items from localStorage
    const savedProducts = JSON.parse(localStorage.getItem("thrift_products")) || [];
    
    if (categoryGrid) {
        categoryGrid.innerHTML = "";

        let dynamicHTML = "";
        savedProducts.forEach(product => {
            const itemCategory = product.category ? product.category.trim() : "";

            dynamicHTML += `
                <div class="product-card bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition" 
                     data-category="${itemCategory}">
                    <div class="relative h-64 w-full bg-slate-100 overflow-hidden group">
                        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-md border border-emerald-200/60 shadow-sm">
                            ${product.condition}
                        </span>
                    </div>
                    <div class="p-4 space-y-3">
                        <div>
                            <h4 class="font-bold text-slate-900 text-base leading-snug line-clamp-1">${product.title}</h4>
                            <div class="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                <i class="fa-solid fa-location-dot text-slate-400"></i>
                                <span>${product.location}</span>
                            </div>
                        </div>
                        <div class="flex items-baseline gap-1.5">
                            <span class="text-xl font-extrabold text-thrift-700">Rs. ${product.price.toLocaleString()}</span>
                            ${product.negotiable ? '<span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">Negotiable</span>' : ''}
                        </div>
                        <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                            ${product.description}
                        </p>
                    </div>
                </div>
            `;
        });
        categoryGrid.innerHTML = dynamicHTML;
    }

    // 2. Immediately filter items based on URL parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get("cat");

    const productCards = document.querySelectorAll(".product-card");

    if (selectedCategory && selectedCategory.toLowerCase() !== "all") {
        productCards.forEach(card => {
            const cardCategory = (card.getAttribute("data-category") || "").trim();
            if (cardCategory.toLowerCase() === selectedCategory.toLowerCase()) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    } else {
        // Show all if no category or 'all' is selected
        productCards.forEach(card => card.style.display = "block");
    }
});