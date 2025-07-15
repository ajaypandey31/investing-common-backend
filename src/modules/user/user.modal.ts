import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
  },
  policyAgreed: {
    type: Boolean,
    required: true,
    validate: {
      validator: (val: boolean) => val === true,
      message: "Accept Terms and Conditions",
    },
  },
  password: {
    type: String,
    validate: {
      validator: (val: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(val),
      message:
        "Password must be 6+ chars with uppercase, lowercase, number, and special char.",
    },
  },
  isPasswordCreated:{
    type: Boolean,
    default: false,
  },
  isMobileVerified: Boolean,
  verificationCode: String,
  codeExpiresAt: Date,
  isKycVerified: Boolean,
  fatherName: String,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default:"Male"
  },
  maritalStatus: {
    type: String,
    enum: ["Married", "Unmarried", "Divorced", "Widowed"],
    default:"Married"
  },
  profession: {
    type: String,
    enum: ["private_sector", "public_sector", "government_sector", "business", "profession", "agriculture"],
    default:"private_sector"
  },
  yearlyIncome: {
    type: String,
    enum: ["25 Lac +", "10 - 25 Lac", "15 - 10 Lac +", "1 - 5 Lac +", "Upto 1 Lac"],
    default:"25 Lac +"
  },
  investmentExperience: {
    type: String,
    enum: ["None", "Beginner", "Intermediate", "Experienced"],
    default:"Beginner"
  },
  profileImage:{type:String, default:"",required:false},
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
