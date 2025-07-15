import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../../utils/response";
import * as userService from "./user.service";

export const signupUser = async (req:any, res:any) => {
  try {
    const user:any = await userService.signupUserService(req.body);
    // await userService.sendVerificationCode(user._id);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    res.cookie("token", token);
    successResponse(res, "User created successfully", user, 201);
  } catch (err:any) {
    errorResponse(res, err.message, 400);
  }
};

export const createPassword = async (req:any, res:any) => {
  try {
    const updatedUser = await userService.createPasswordService(req.params.id, req.body);
    successResponse(res, "Password updated successfully");
  } catch (err:any) {
    
    errorResponse(res, err.message, 400);
  }
};

export const loginUser = async (req:any, res:any) => {
  try {
    const user:any = await userService.loginUserService(req.body.mobileNumber, req.body.password);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    res.cookie("token", token);
    successResponse(res, "Login successful", user);
  } catch (err:any) {
    errorResponse(res, err.message, 400);
  }
};

export const getAllUsers = async (req:any, res:any)=>{
    try {
        const users:any = await userService.getAllUsersService();
        const usersWithoutPassword = users.map((user: any) => {
          const { password, ...userWithoutPassword } = user.toObject(); // Use .toObject() if using Mongoose
          return userWithoutPassword;
        });
        successResponse(res, "All users fetched successfully", usersWithoutPassword);
    } catch (err:any) {
        errorResponse(res, err.message, 400);
    }
}

export const updateUserProfile = async (req: any, res: any) => {
  try {
    const userId = req.user._id;
    const updateData = { ...req.body };

    if (req.file) {

      const host = req.get('host');
      const isLocalhost = host.includes('localhost');
      const baseUrl = `${req.protocol}://${host}${isLocalhost ? '' : '/api/v1'}`;
      updateData.profileImage = `${baseUrl}/uploads/profile-images/${req.file.filename}`;
    }

    const updatedUser :any= await userService.updateUserByIdService(userId, updateData);
    successResponse(res, "User profile updated successfully", updatedUser);
  } catch (error) {
    errorResponse(res, "Error updating user profile", 500);
  }
};


export const sendOTP = async (req: any, res: any) => {
  try {
    await userService.sendVerificationCode(req.params.id);
    successResponse(res, "OTP sent successfully");
  } catch (err: any) {
    errorResponse(res, err.message, 400);
  }
};

export const verifyOTP = async (req: any, res: any) => {
  try {
    const user:any = await userService.verifyOTP(req.params.id, req.body.code);
    successResponse(res, "Mobile verified successfully", user);
  } catch (err: any) {
    errorResponse(res, err.message, 400);
  }
};


export const getAuthenticatedUser = async (req:any, res:any) => {
  try {
    const id = req.user._id;
    const user:any = await userService.getAuthenticatedUserService(id);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    const { password, ...userInfo } = user.toObject(); // Use .toObject() if using Mongoose
    successResponse(res, "User fetched successfully", userInfo);
  } catch (error) {
    errorResponse(res, "Error fetching user", 500);
  }
}

export const logoutUser = async (req:any, res:any) => {
 try {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  successResponse(res, "Logout successful", null, 200);
 } catch (error) {
  errorResponse(res, "Error logging out", 500);
 }
}
