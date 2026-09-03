document.addEventListener("DOMContentLoaded", function () {
  const { Client, Account, ID, Databases } = Appwrite;

  // Initialize Appwrite client
  const client = new Client();
  client
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("6824e596002e077be92c");

  const account = new Account(client);
  const databases = new Databases(client);
  const databaseId = "6824e8fe00333d476f22";
  const collectionId = "6824e90e0011734e58cc";

  const signupForm = document.querySelector("#signupform");
  const loginForm = document.querySelector("#loginform");

  const authHandler = async () => {
    try {
      const user = await account.get();
      const authBtnP = document.getElementById("auth-btn-phone");
      const authBtnD = document.getElementById("auth-btn-desktop");

      if (user) {
        if (authBtnP) authBtnP.innerHTML = "Logout";
        if (authBtnD) authBtnD.innerHTML = "Logout";
        if (authBtnP) authBtnP.addEventListener("click", logout);
        if (authBtnD) authBtnD.addEventListener("click", logout);
      } else {
        if (authBtnP) authBtnP.innerHTML = "Login / Signup";
        if (authBtnD) authBtnD.innerHTML = "Login / Signup";
        if (authBtnP) {
          authBtnP.removeEventListener("click", logout);
          authBtnP.addEventListener("click", () => {
            window.location.href = "LoginSignup.html";
          });
        }
        if (authBtnD) {
          authBtnD.removeEventListener("click", logout);
          authBtnD.addEventListener("click", () => {
            window.location.href = "LoginSignup.html";
          });
        }
      }
    } catch (error) {
      console.log("User not logged in", error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      localStorage.removeItem("user");
      location.reload();
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  authHandler();

  // ====================
  // Signup Handler
  // ====================
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = signupForm.querySelector("#name")?.value || "User";
      const email = signupForm.querySelector("#email")?.value;
      const password = signupForm.querySelector("#password")?.value;

      if (!email.includes("@")) {
        alert("Please enter a valid email address");
        return;
      }
      if (password.length < 8) {
        alert("Password must be at least 8 characters");
        return;
      }

      try {
        const response = await account.create(ID.unique(), email, password, name);

        await databases.createDocument(databaseId, collectionId, ID.unique(), {
          email,
          name,
          userId: response.$id
        });

        localStorage.setItem("user", JSON.stringify(response));
        alert("Account created successfully! Please login.");
        window.location.href = "LoginSignup.html";
      } catch (error) {
        console.error(error);
        if (error.code === 409) {
          alert("Account already exists. Please login instead.");
        } else {
          alert("Signup failed. Please try again.");
        }
      }
    });
  }

  // ====================
  // Login Handler
  // ====================
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector("#email")?.value;
      const password = loginForm.querySelector("#password")?.value;

      if (!email.includes("@")) {
        alert("Please enter a valid email address");
        return;
      }
      if (password.length < 8) {
        alert("Password must be at least 8 characters");
        return;
      }

      try {
        const response = await account.createEmailSession(email, password);
        localStorage.setItem("user", JSON.stringify(response));
        alert("Logged in successfully!");
        window.location.href = "profile.html";
      } catch (error) {
        console.error(error);
        alert("Login failed. Please check your credentials and try again.");
      }
    });
  }

  // ====================
  // Google OAuth Login
  // ====================
  const googleLoginBtn = document.getElementById("googleLoginBtn");

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", () => {
      const baseURL = window.location.origin;
      account.createOAuth2Session(
        "google",
        `${baseURL}/public/profile.html`,
        `${baseURL}/public/LoginSignup.html`
      );
    });
  }

  // ====================
  // Sync Google User
  // ====================
  const syncGoogleUser = async () => {
    try {
      const user = await account.get();
      await databases.createDocument(databaseId, collectionId, ID.unique(), {
        email: user.email,
        name: user.name,
        userId: user.$id
      });
    } catch (err) {
      console.error("Failed to sync Google user", err);
    }
  };

  window.addEventListener("load", () => {
    if (
      window.location.pathname.endsWith("/public/index.html") ||
      window.location.pathname === "/" ||
      window.location.pathname.includes("/public/index.html")
    ) {
      syncGoogleUser();
    }
  });
});
