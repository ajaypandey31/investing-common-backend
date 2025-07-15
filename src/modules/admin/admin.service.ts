
import Admin from "./admin.modal";

export const loginAdminService = async(data:any)=>{
    const admin = await Admin.findOne({email:data.email});
    if(!admin){
        throw new Error("Invalid credentials");
    }
    if(admin.password !== data.password){
        throw new Error("Invalid credentials");
    }
    return admin;
}