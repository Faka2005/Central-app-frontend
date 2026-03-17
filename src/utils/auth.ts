  import {useRouter} from "vue-router";
  // @ts-ignore
  const API_URL = import.meta.env.VITE_API_URL;

  const router = useRouter();
  export type User={
    id: string,
    username: string,
    email: string,
    password: string,
    role: string,
  }
  export async function Login(email: string, password: string) {
    console.log("API URL =", API_URL);

    try {
      // 1️⃣ Login
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // 2️⃣ Get current user
      const userResponse = await fetch(`${API_URL}/users/me`, {
        credentials: "include",
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user");
      }

      const user = await userResponse.json();

      return user;

    } catch (error) {
      console.error("Login error:", error);
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
      const response = await fetch(`${API_URL}/auth/register`, {
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
      console.error("Register error:", error);
      throw error;
    }
  }


  /**
   * Déconnecte l'user
   */
  export default  async function Logout() {
    try {
      // Supprime localStorage
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      router.push("/");

    } catch (error) {
      console.error("Logout error:", error);
    }
  }


  /**
   *Renvoie l'utisateur actuel
   */
  export function getUser() {
    const userString = sessionStorage.getItem("user")
    if (!userString) return null
    return JSON.parse(userString) 
  }