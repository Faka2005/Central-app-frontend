// utils/password.ts
import { useAppStore } from "../store/app";


// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;

export type Password = {
  site: string;
  email: string;
  password: string;
  description: string;
};

export type PasswordWithId = Password & {
  id: string;
};




/**
 * 📥 Récupérer tous les mots de passe
 */
export async function getAllPasswords() {
  const appStore = useAppStore();
  try {
    const res = await fetch(`${API_URL}/password/`, {
      credentials: "include",
      headers: { "Accept": "application/json" },
    });
    if (!res.ok) throw new Error("Impossible de récupérer les mots de passe");
    return await res.json();
  } catch (err: any) {
    appStore.error("Erreur Backend", err.message);
    return [];
  }
}

/**
 * 🔐 Ajouter un mot de passe
 */
export async function addPassword(data: any) {
  const appStore = useAppStore();
  try {
    const res = await fetch(`${API_URL}/password/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
    
    const result = await res.json();
    appStore.success("Succès", "Mot de passe ajouté au coffre-fort.");
    return result;
  } catch (err: any) {
    appStore.error("Échec", err.message);
    throw err;
  }
}

/**
 * 🗑 Supprimer un mot de passe
 */
export async function deletePassword(id: string) {
  const appStore = useAppStore();
  try {
    const res = await fetch(`${API_URL}/password/`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }), // On envoie l'ID dans le body comme ton controller l'attend
    });

    if (!res.ok) throw new Error("Suppression impossible");
    
    appStore.quick('info', "Supprimé", "L'entrée a été retirée.");
  } catch (err: any) {
    appStore.error("Erreur", err.message);
    throw err;
  }
}