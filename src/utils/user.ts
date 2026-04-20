import { useUserStore } from "../store/store";

// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;

export async function GetProfileByUser(){
    try{
        const response = await fetch(`{API_URL}/users/me`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"include",

        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Récupération du profile failed");
        }
        useUserStore().setProfile(data);
        return data;
    }catch(err){
        return err
    }
}