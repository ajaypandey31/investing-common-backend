import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(__dirname, "../uploads/profile-images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
    cb(null, uploadDir);
  },
  filename: function (req:any, file:any, cb:any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `profile-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

export const uploadProfileImage = upload.single("profileImage");
