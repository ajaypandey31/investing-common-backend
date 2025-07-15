import express from "express";
import { signupUser, createPassword, loginUser, updateUserProfile, sendOTP, verifyOTP, getAllUsers, getAuthenticatedUser, logoutUser } from "./user.controller";
import { userAuth, VerifyTokenAndGetUser } from "../../middleware/userAuth";
import { createPasswordValidation, loginValidation, signupValidation } from "./user.validation";
import checkValidationErrors from "../../middleware/validator";
import { uploadProfileImage } from "../../middleware/upload";

const router = express.Router();



// Signup route with validation
router.post("/signup", signupValidation, checkValidationErrors, signupUser);

// Create password route with validation
router.patch("/create-password/:id",  createPassword);

// Login route with validation
router.post("/login", loginValidation, checkValidationErrors, loginUser);

router.put("/update-profile",VerifyTokenAndGetUser,uploadProfileImage, updateUserProfile)

router.post("/send-otp/:id", sendOTP);
router.post("/verify-otp/:id", verifyOTP);

router.get("/hello", VerifyTokenAndGetUser, (req, res) => {
  res.send("Hello World");
});

router.get("/all",getAllUsers)
router.get("/verified-info",VerifyTokenAndGetUser,getAuthenticatedUser)
router.post("/logout",logoutUser)

export default router;
