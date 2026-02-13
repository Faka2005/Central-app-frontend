import {getUser} from "./auth";

export type Password={
    site:string,
    email: string,
    password: string,
    description:string
}

/**
 * Ajoute un mot de passe à la base de données
 * @params site -types Password
 * @params email -types Password
 * @params email -types Password
 * @params description -types Password
 *  */
export async function AddPasword({site, email, password,description}: Password  ) {
    if(!site||!email || !password||!description){
        throw new Error("Missing required fields");
    }
    const user=getUser()
    const userId=user.id
    try{
        const res =await fetch(`http://localhost:3000/password/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userId,site,email,password,description})
        })
        const data=await res.json()
        if(!res.ok){
            throw new Error(data.message||"Erreur lors de l'ajout du mot de passe")
        }
        return {succes:true,data}
    }catch(err){
        return err
    }
}
export async function DeletePasword(params:String) {
    
}
export async function GetAllPasword(params:String) {
    
}
export async function ModifyPasword(params:String) {
    
}