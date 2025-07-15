import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import User from "../modules/user/user.modal";

export const userAuth = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, "Invalid user ID format", 400);
  }

  try {
    const user = await User.findById(id);
    if (!user) return errorResponse(res, "User not found", 404);

    req.user = user;
    next();
  } catch (error:any) {
    return errorResponse(res, "Server error while fetching user", 500, error.message);
  }
};

export const VerifyTokenAndGetUser = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies?.token;
    if (!token) return errorResponse(res, "No token provided", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById((decoded as any).userId);

    if (!user) return errorResponse(res, "User not found", 404);

    req.user = user;
    next();
  } catch (error:any) {
    return errorResponse(res, "Token verification failed", 500, error.message);
  }
};
