import { successResponse,errorResponse } from "../../utils/response";
import { loginAdminService } from "./admin.service";

export const loginAdmin = async (req: any, res: any) => {
     try {
        const admin:any = await loginAdminService(req.body);
     successResponse(res, "Admin logged in successfully", admin);
     } catch (err:any) {
         errorResponse(res, err.message, 400);
     }
}