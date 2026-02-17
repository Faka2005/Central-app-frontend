export interface Surah {
  id: string;
  number: number;
  name: string;
  audioFile: string;
}

export interface Reciter {
  id: string;
  name: string;
  slug: string;
  basePath: string;
  surahs: Surah[];
}export interface Reciters {
  id: string;
  name: string;
  slug: string;
  basePath: string;

}
// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;
export interface ReciterResponse {
  reciter: Reciter;
}

export async function GetRecitateur(slug: string): Promise<Reciter> {
  const response = await fetch(`${API_URL}/reciter/${slug}`);

  if (!response.ok) {
    throw new Error("Erreur API reciter");
  }

  const data: ReciterResponse = await response.json();
  console.log("Reciter backend:", data);

  return data.reciter;
}


export interface ReciterResponse {
  reciters: Reciters[]; // note le pluriel
}

export async function GetAllRecitateur(): Promise<Reciters[]> {
  const response = await fetch(`${API_URL}/reciter`);

  if (!response.ok) {
    throw new Error("Erreur API reciter");
  }

  const data = await response.json();
  console.log("Reciters backend:", data);

  // Comme le backend renvoie déjà un tableau
  return Array.isArray(data) ? data : [];
}

