  // @ts-ignore
  
  const API_URL = import.meta.env.VITE_API_URL;
  import { User } from '../Interface/User';
import { useUserStore } from '../store/user';




    /**
   * Connecte  l'utilsateur 
   * @params email
   * @params password 
   * 
   */
  export async function Login(email: string, password: string) {
    console.log("API URL =", API_URL);

    try {
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // CRUCIAL : Sans cette ligne, le navigateur n'envoie JAMAIS les cookies
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Mettre à jour le store avec les données de l'utilisateur
      //const userStore = useUserStore();
      //userStore.setUser(data.user); // Assurez-vous que data.user contient les bonnes informations
      
      console .log("Login successful");

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
      const response =await fetch(`${API_URL}/auth/logout`, {
        credentials:"include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
      })


        if (!response.ok) {
          throw new Error("Logout failed");
        }
        useUserStore().clearUser();
        
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

export const getUser = async () => {
  try {
    const response = await fetch("http://localhost:3000/auth/me", {
      method: "GET",
      // CRUCIAL : Sans cette ligne, le navigateur n'envoie JAMAIS les cookies
      credentials: "include", 
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    if (response.status === 401) return null;
    if (!response.ok) throw new Error("Erreur serveur");

    return await response.json();
  } catch (err) {
    console.error("Erreur getUser:", err);
    return null;
  }
};

  /**
   * Supprime le compte de l'utilisateur actuel
   */
  export async function deleteUser() {
    try {
      const response = await fetch(`${API_URL}/auth/delete`, {
        credentials: "include",
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      await Logout()


      console.log("User deleted successfully");
      
    } catch (error) {
      console.error("Delete user error:", error);
    }
  }