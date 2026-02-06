export async function getSourateByRecitateurId(slug) {
  try {
    const response = await fetch(`http://localhost:3000/surahs/`,{
  method: "GET",       // ou "GET"
  headers: { "Content-Type": "application/json" }, // si JSON
  body: JSON.stringify($reciterId), 
});

    if (!response.ok) {
      throw new Error("Erreur API");
    }

    const data = await response.json();

    console.log("RECITER:", data);
    console.log("SURAHS:", data);
    
    return data ?? []; // ✅ LA LIGNE CLÉ
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
