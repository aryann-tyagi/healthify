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
  const authBtnP = document.getElementById("auth-btn-phone");
  const authBtnD = document.getElementById("auth-btn-desktop");
  const signupForm = document.querySelector("#signupform");
  const loginForm = document.querySelector("#loginform");
  const googleLoginBtn = document.getElementById("googleLoginBtn");
  const errorBox = document.getElementById("errorBox");

  // Track Firebase Auth status
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split("@")[0]
      };
      localStorage.setItem("user", JSON.stringify(userData));

      if (authBtnP) {
        authBtnP.innerHTML = "Logout";
        authBtnP.onclick = handleLogout;
      }
      if (authBtnD) {
        authBtnD.innerHTML = "Logout";
        authBtnD.onclick = handleLogout;
      }
    } else {
      localStorage.removeItem("user");
      if (authBtnP) {
        authBtnP.innerHTML = "Login / Signup";
        authBtnP.onclick = () => { window.location.href = "LoginSignup.html"; };
      }
      if (authBtnD) {
        authBtnD.innerHTML = "Login / Signup";
        authBtnD.onclick = () => { window.location.href = "LoginSignup.html"; };
      }
    }
  });

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
        window.location.href = "profile.html";
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
        window.location.href = "profile.html";
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
        window.location.href = "profile.html";
      } catch (error) {
        console.error("Google sign in error:", error);
        const msg = error.message || "Google Sign-In failed.";
        if (errorBox) errorBox.textContent = msg; else alert(msg);
      }
    });
  }
});
