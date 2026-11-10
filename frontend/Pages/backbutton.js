document.addEventListener("DOMContentLoaded", function () {
    // Don't show the back button if we are already on the home page
    const isHome = window.location.pathname.endsWith("home.html") || window.location.pathname === "/" || window.location.pathname.endsWith("index.html");
    if (isHome) return;

    // Create the back button with explicit inline positioning to guarantee top-left placement
    const backBtn = document.createElement("a");
    backBtn.href = "#";
    backBtn.style.position = "fixed";
    backBtn.style.top = "4.5rem";
    backBtn.style.left = "1.5rem";
    backBtn.style.zIndex = "50";
    
    backBtn.className = "bg-white/95 backdrop-blur-md text-slate-700 hover:text-emerald-700 hover:bg-white border border-stone-200/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-300 flex items-center gap-2 group cursor-pointer";
    
    backBtn.innerHTML = `
        <i class="fa-solid fa-arrow-left transform group-hover:-translate-x-1 transition-transform text-emerald-600"></i>
        <span>Back</span>
    `;

    // Smart click handler: goes to previous page in history, or falls back to home if opened directly
    backBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.history.length > 1 && document.referrer) {
            window.history.back();
        } else {
            window.location.href = "home.html";
        }
    });

    document.body.appendChild(backBtn);
});