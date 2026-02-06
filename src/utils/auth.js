export async function Login(email, password) {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    // Stocke le token pour usage futur
    localStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));

    return data.user;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}

/**
 * Enregistre l'utilsateur
 * 
 */
async function Register(username, email, password) {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    // Après inscription, on peut connecter automatiquement
    return await Login(email, password);
  } catch (error) {
    console.error("Register error:", error.message);
    throw error;
  }
}


/**
 * Déconnecte l'user
 */
export async function Logout() {
  try {
    // Supprime localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optionnel : tu peux aussi appeler une API `/logout` si besoin
    console.log("User logged out");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
}
