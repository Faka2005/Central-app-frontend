import { getUser } from "./auth";

// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;

export type Password = {
    site: string;
    email: string;
    password: string;
    description: string;
};

/**
 * Ajouter un mot de passe
 */
export async function addPassword(data: Password) {
    const user = await getUser();
    const userId = user?.id;

    if (!userId) throw new Error("Utilisateur non connecté");

    const res = await fetch(`${API_URL}/password/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const response = await res.json();

    if (!res.ok) {
        throw new Error(response.message || "Erreur lors de l'ajout");
    }

    return response;
}

export async function deletePassword(id: string) {
    if (!id) throw new Error("ID manquant");

    const res = await fetch(`${API_URL}/password/${id}`, {
        method: "DELETE",
    });

    const response = await res.json();

    if (!res.ok) {
        throw new Error(response.message || "Erreur suppression");
    }

    return response;
}

export async function updatePassword(
    id: string,
    updatedFields: Partial<Password>
) {
    if (!id) throw new Error("ID manquant");

    const res = await fetch(`${API_URL}/password/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
    });

    const response = await res.json();

    if (!res.ok) {
        throw new Error(response.message || "Erreur modification");
    }

    return response;
}
export async function getAllPasswords() {
    const user = await getUser();
    const userId = user?.id;

    if (!userId) throw new Error("Utilisateur non connecté");

    const res = await fetch(`${API_URL}/password/user/${userId}`);

    const response = await res.json();

    if (!res.ok) {
        throw new Error(response.message || "Erreur récupération");
    }

    return response;
}
