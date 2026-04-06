  import {useRouter} from "vue-router";
  // @ts-ignore
  const API_URL = import.meta.env.VITE_API_URL;

  const router = useRouter();
  export type User={
    username: string,
    email: string,
    role: string,
  }

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

        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

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
      console.log(getUser());
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
        method: "POST",
      })


        if (!response.ok) {
          throw new Error("Logout failed");
        }
        

    } catch (error) {
      console.error("Logout error:", error);
    }
  }


  /**
   *Renvoie l'utisateur actuel
   */
  export async function getUser() {
        try{
          const response =await fetch(API_URL+ "/auth/me",{
            credentials: "include",
            method: "GET",
          })

          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }

          const user :User= await response.json();


          return user;
        }catch(error){
          console.error("Getting user");
        }
  }

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

      await Logout().then(() => {
        router.push("/login");
      });


      console.log("User deleted successfully");
      
    } catch (error) {
      console.error("Delete user error:", error);
    }
  }