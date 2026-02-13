
export async function Login(email:string, password:string) {
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
 * @params username
 * @params email
 * @params password 
 * 
 */
export async function Register(username:string, email:string, password:string) {
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
    sessionStorage.removeItem("user");

    // Optionnel : tu peux aussi appeler une API `/logout` si besoin
    console.log("User logged out");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
}

export function getUser() {
  const userString = sessionStorage.getItem("user")
  if (!userString) return null
  return JSON.parse(userString) 
}