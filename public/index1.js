import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase Configuration from user
const firebaseConfig = {
  apiKey: "AIzaSyDFYqv2K6B4v6fDJWpzRdkNLLa2dK-z9J4",
  authDomain: "healthify-71a2d.firebaseapp.com",
  projectId: "healthify-71a2d",
  storageBucket: "healthify-71a2d.firebasestorage.app",
  messagingSenderId: "317330842878",
  appId: "1:317330842878:web:040b8043fb4959ae63b1af"
};

// Initialize Firebase App & Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#signupform");
  const loginForm = document.querySelector("#loginform");
  const googleLoginBtn = document.getElementById("googleLoginBtn");
  const errorBox = document.getElementById("errorBox");

  // Track Firebase Auth status
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const displayName = user.displayName || (user.email ? user.email.split("@")[0] : "User");
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName
      };
      localStorage.setItem("user", JSON.stringify(userData));
      updateHeaderUI(user);
    } else {
      localStorage.removeItem("user");
      updateHeaderUI(null);
    }
  });

  function updateHeaderUI(user) {
    // Select login links across all pages and headers
    const loginLinks = document.querySelectorAll('a[href*="LoginSignup.html"], #auth-btn-desktop, #auth-btn-phone');

    loginLinks.forEach((link) => {
      // Don't modify links that are in form footers or explicit signup prompts inside page body
      if (link.closest("form") || link.closest("p.mt-8") || link.closest(".footer-links")) {
        return;
      }

      const container = link.parentElement;
      let existingBadge = container ? container.querySelector(".user-profile-badge") : null;

      if (user) {
        // User is logged in: remove/hide Login button and show user name + logout button
        const rawName = user.displayName || (user.email ? user.email.split("@")[0] : "User");
        const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

        if (!existingBadge) {
          existingBadge = document.createElement("div");
          existingBadge.className = "user-profile-badge inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full text-blue-800 font-semibold text-xs md:text-sm shadow-sm transition-all";
          existingBadge.innerHTML = `
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
              <span>${formattedName}</span>
            </span>
            <button class="header-logout-btn bg-rose-500 hover:bg-rose-600 text-white px-2.5 py-0.5 rounded-full text-xs font-bold transition-all shadow-sm">
              Logout
            </button>
          `;

          const logoutBtn = existingBadge.querySelector(".header-logout-btn");
          if (logoutBtn) {
            logoutBtn.addEventListener("click", handleLogout);
          }

          if (container) {
            container.insertBefore(existingBadge, link);
          }
        } else {
          const nameSpan = existingBadge.querySelector("span span");
          if (nameSpan) nameSpan.textContent = formattedName;
        }

        link.style.display = "none";
      } else {
        // User logged out: show Login button and remove user profile badge
        if (existingBadge) {
          existingBadge.remove();
        }
        link.style.display = "";
      }
    });
  }

  async function handleLogout(e) {
    if (e) e.preventDefault();
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      alert("Logged out successfully");
      window.location.href = "index.html";
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  // Handle Email & Password Signup
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (errorBox) errorBox.textContent = "";

      const email = signupForm.querySelector("#email")?.value.trim();
      const password = signupForm.querySelector("#password")?.value.trim();

      if (!email || !email.includes("@")) {
        const msg = "Please enter a valid email address.";
        if (errorBox) errorBox.textContent = msg; else alert(msg);
        return;
      }
      if (!password || password.length < 6) {
        const msg = "Password must be at least 6 characters.";
        if (errorBox) errorBox.textContent = msg; else alert(msg);
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signup success:", userCredential.user);
        alert("Account created successfully!");
        window.location.href = "index.html";
      } catch (error) {
        console.error("Signup error:", error);
        let msg = "Signup failed. Please try again.";
        if (error.code === "auth/email-already-in-use") msg = "This email is already in use.";
        else if (error.code === "auth/weak-password") msg = "Password should be at least 6 characters.";
        if (errorBox) errorBox.textContent = msg; else alert(msg);
      }
    });
  }

  // Handle Email & Password Login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (errorBox) errorBox.textContent = "";

      const email = loginForm.querySelector("#email")?.value.trim();
      const password = loginForm.querySelector("#password")?.value.trim();

      if (!email || !email.includes("@")) {
        const msg = "Please enter a valid email address.";
        if (errorBox) errorBox.textContent = msg; else alert(msg);
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login success:", userCredential.user);
        alert("Logged in successfully!");
        window.location.href = "index.html";
      } catch (error) {
        console.error("Login error:", error);
        let msg = "Login failed. Please check your credentials.";
        if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          msg = "Invalid email or password.";
        }
        if (errorBox) errorBox.textContent = msg; else alert(msg);
      }
    });
  }

  // Handle Google OAuth Login
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async () => {
      if (errorBox) errorBox.textContent = "";
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Google Sign-In success:", result.user);
        alert("Signed in with Google successfully!");
        window.location.href = "index.html";
      } catch (error) {
        console.error("Google sign in error:", error);
        const msg = error.message || "Google Sign-In failed.";
        if (errorBox) errorBox.textContent = msg; else alert(msg);
      }
    });
  }
});
