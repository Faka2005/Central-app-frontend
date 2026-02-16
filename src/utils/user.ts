export async function GetProfileByUser(userId:string){
    try{
        const response = await fetch(`http://localhost:3000/users/me/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Récupération du profile failed");
        }
        sessionStorage.setItem("profile", JSON.stringify(data));
        return data;
    }catch(err){
        return err
    }
}