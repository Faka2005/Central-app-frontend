import { getUser } from "./auth";

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
 * 🔐 Ajouter un mot de passe
 */
export async function addPassword(data: Password): Promise<PasswordWithId> {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) throw new Error("Utilisateur non connecté");

  const res = await fetch(`${API_URL}/password/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur lors de l'ajout");
  }

  return await res.json();
}

/**
 * 📥 Récupérer tous les mots de passe
 */
export async function getAllPasswords(): Promise<PasswordWithId[]> {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) throw new Error("Utilisateur non connecté");

  const res = await fetch(`${API_URL}/password/user/${userId}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur récupération");
  }

  return await res.json();
}

/**
 * ✏️ Modifier
 */
export async function updatePassword(
  id: string,
  updatedFields: Partial<Password>
): Promise<void> {
  if (!id) throw new Error("ID manquant");

  const res = await fetch(`${API_URL}/password/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur modification");
  }
}

/**
 * 🗑 Supprimer
 */
export async function deletePassword(id: string): Promise<void> {
  if (!id) throw new Error("ID manquant");

  const res = await fetch(`${API_URL}/password/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur suppression");
  }
}