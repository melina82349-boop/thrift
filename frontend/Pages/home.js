/* =========================================================
   THRIFT - HOME PAGE PRODUCT RENDERER & SEARCH FILTER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const productGrid = document.getElementById("productGrid");
    const searchInput = document.querySelector(".search-box input");
    const searchBtn = document.querySelector(".search-btn");

    // 1. Retrieve user-uploaded products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem("thrift_products")) || [];

    // 2. Render products dynamically into the product grid
    function renderProducts(productsToDisplay) {
        if (!productGrid) return;

        let dynamicHTML = "";

        productsToDisplay.forEach(product => {
            dynamicHTML += `
                <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition product-card" 
                     data-title="${product.title.toLowerCase()}" 
                     data-category="${product.category.toLowerCase()}">
                    
                    <!-- Product Image & Condition Badge -->
                    <div class="relative h-64 w-full bg-slate-100 overflow-hidden group">
                        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        
                        <button class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-red-500 flex items-center justify-center transition shadow-sm">
                            <i class="fa-regular fa-heart text-sm"></i>
                        </button>

                        <span class="absolute top-3 left-3 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-md border border-emerald-200/60 shadow-sm">
                            ${product.condition}
                        </span>
                    </div>

                    <!-- Product Card Body -->
                    <div class="p-4 space-y-3">
                        <div>
                            <h4 class="font-bold text-slate-900 text-base leading-snug line-clamp-1">${product.title}</h4>
                            <div class="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                <i class="fa-solid fa-location-dot text-slate-400"></i>
                                <span>${product.location}</span>
                            </div>
                        </div>

                        <!-- Price & Negotiation Badge -->
                        <div class="flex items-baseline gap-1.5">
                            <span class="text-xl font-extrabold text-thrift-700">Rs. ${product.price.toLocaleString()}</span>
                            ${product.negotiable ? '<span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">Negotiable</span>' : ''}
                        </div>

                        <!-- Description -->
                        <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                            ${product.description}
                        </p>

                        <!-- Action Button -->
                        <button class="w-full border border-thrift-700 text-thrift-700 font-bold py-2 px-4 rounded-xl text-xs hover:bg-thrift-700 hover:text-white transition flex items-center justify-center gap-1.5">
                            <span>View Details</span>
                            <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        // Prepend uploaded products so the newest listings show up first
        if (productsToDisplay.length > 0) {
            productGrid.insertAdjacentHTML("afterbegin", dynamicHTML);
        }
    }

    // Initial load call
    renderProducts(savedProducts);

    // 3. Dynamic Real-Time Search Filtering
    function filterProducts() {
        if (!searchInput) return;
        const query = searchInput.value.toLowerCase().trim();
        const allProductCards = document.querySelectorAll(".product-card");

        allProductCards.forEach(card => {
            const title = card.getAttribute("data-title") || "";
            const category = card.getAttribute("data-category") || "";

            if (title.includes(query) || category.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Attach search event listeners
    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }
    if (searchBtn) {
        searchBtn.addEventListener("click", function (e) {
            e.preventDefault();
            filterProducts();
        });
    }
});