
import { hashPassword, comparePassword } from "../../utils/bcrypt";
import { sendSMS } from "../../utils/twilio";
import User from "./user.modal";

export const signupUserService = async (data: any) => {
  const existedUser = await User.findOne({ mobileNumber: data.mobileNumber });
  if (existedUser) throw new Error("User already exists");

  const user = new User(data);
  return await user.save();
};

export const createPasswordService = async (id: any, data: any) => {
  const userExists :any= await User.findById(id);
  console.log(userExists);
  userExists.password = await hashPassword(data.password);
  userExists.isPasswordCreated = true;
  return await userExists.save();
};

export const loginUserService = async (mobileNumber: string, password: string) => {
  const user = await User.findOne({ mobileNumber });
  if (!user || !user.password) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  return user;
};

export const getAllUsersService = async () => {
  const users = await User.find();
  return users;
};

export const updateUserByIdService = async (userId: any, updateData: any) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const allowedFields = [
    "fullName",
    "fatherName",
    "gender",
    "maritalStatus",
    "profession",
    "yearlyIncome",
    "investmentExperience",
    "isKycVerified",
    "profileImage", // Include this if controller provides it
  ];

  const updates: any = {};
  for (const key of allowedFields) {
    if (updateData[key] !== undefined) {
      updates[key] = updateData[key];
    }
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
  return updatedUser;
};


export const sendVerificationCode = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const expiry = new Date(Date.now() + 5 * 60000); // 5 minutes from now

  user.verificationCode = code;
  user.codeExpiresAt = expiry;
  await user.save();

  await sendSMS(user.mobileNumber, `Your verification code is ${code}`);
  return true;
};


export const verifyOTP = async (userId: string, code: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (
    user.verificationCode !== code ||
    !user.codeExpiresAt ||
    new Date(user.codeExpiresAt) < new Date()
  ) {
    throw new Error("Invalid or expired verification code");
  }

  user.isMobileVerified = true;
  user.verificationCode = undefined;
  user.codeExpiresAt = undefined;
  await user.save();
  return user;
};



export const getAuthenticatedUserService = async (userId: string) => {
  const user = await User.findById(userId).select("-password -verificationCode -codeExpiresAt");
  if (!user) throw new Error("User not found");

  return user;
}


