// utils/recitateur.ts
export async function GetRecitateur() {
  try {
    const response = await fetch("http://localhost:3000/reciter"); // le port du backend
    if (!response.ok) throw new Error("Erreur API");

    const data = await response.json();
    console.log("Data backend recitateur:", data); // 🔥 Ajoute ça
    return data;
  } catch (error) {
    console.error("Erreur fetch recitateur:", error.message);
    return [];
  }
}
