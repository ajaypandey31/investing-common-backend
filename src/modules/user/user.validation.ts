import { body, param } from "express-validator";

// Signup validation
export const signupValidation = [
  body("fullName")
    .isString()
    .withMessage("Full Name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Full Name must be between 2 and 50 characters"),
  body("mobileNumber")
    .isString()
    .withMessage("Mobile Number must be a string")
    .isLength({ min: 10, max: 14 })
    .withMessage("Mobile Number must be exactly 10 digits"),
  body("policyAgreed")
    .isBoolean()
    .withMessage("Accepted Terms must be a boolean value")
    .withMessage("You must accept the terms and conditions")
];

// Login validation
export const loginValidation = [
  body("mobileNumber")
    .isString()
    .withMessage("Mobile Number must be a string")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile Number must be exactly 10 digits"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required"),
];

// Create password validation (for PATCH request)
export const createPasswordValidation = [
  body("password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
    .withMessage(
      "Password must be 6+ chars with uppercase, lowercase, number, and special char."
    ),
];
