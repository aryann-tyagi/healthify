document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("app-header");
  if (!header) return;

  header.innerHTML = `
    <nav class="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-500 ease-in-out">
      <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <img src="./src/img/aimed-icon-removebg.png" alt="Logo" class="h-10" />
          <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Healthify
          </span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-6 items-center">
          ${createNavLinks()}
        </div>

        <!-- Mobile Button -->
        <button id="mobile-menu-button"
          class="md:hidden text-gray-700 hover:text-blue-600 transition">
          ☰
        </button>
      </div>

      <!-- Mobile Sidebar -->
      <div id="mobile-sidebar"
        class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform -translate-x-full transition-transform duration-300 z-40 md:hidden">
        <div class="p-4 space-y-4">
          ${createMobileLinks()}
        </div>
      </div>

      <div id="overlay"
        class="fixed inset-0 bg-black bg-opacity-30 hidden z-30 md:hidden"></div>
    </nav>
  `;

  /* MOBILE MENU */
  const mobileBtn = document.getElementById("mobile-menu-button");
  const sidebar = document.getElementById("mobile-sidebar");
  const overlay = document.getElementById("overlay");

  mobileBtn.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  });

  /* DARK MODE */
  const root = document.documentElement;
  const toggle = document.getElementById("darkToggle");

  if (localStorage.getItem("theme") === "dark") {
    root.classList.add("dark");
    toggle.textContent = "☀️";
  }

  toggle.addEventListener("click", () => {
    root.classList.toggle("dark");
    const dark = root.classList.contains("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
    toggle.textContent = dark ? "☀️" : "🌙";
  });
});

/* FUNCTIONS */
function createNavLinks() {
  return `
    <a href="index.html" class="nav-link">Home</a>
    <a href="extract-text.html" class="nav-link">Prescription</a>
    <a href="predictor.html" class="nav-link">Diagnosis</a>
    <a href="LoginSignup.html" class="nav-link">Login</a>

    <button id="darkToggle"
      class="ml-4 w-10 h-10 rounded-full bg-white border hover:bg-gray-100">
      🌙
    </button>
  `;
}

function createMobileLinks() {
  return `
    <a href="index.html" class="block py-2">Home</a>
    <a href="extract-text.html" class="block py-2">Prescription</a>
    <a href="predictor.html" class="block py-2">Diagnosis</a>
    <a href="LoginSignup.html" class="block py-2">Login</a>
  `;
}
