import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./modules/user/user.route";
import adminRoutes from "./modules/admin/admin.route";
import newsApiRoutes from "./modules/newsApi/newsApi.routes";
import path from "path";

const app = express();

dotenv.config({
  path: ".env",
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://104.131.67.238:3000/",
      "http://104.131.67.238:5556",
      "http://104.131.67.238:5556/",
      "http://104.131.67.238:3000",
      "http://localhost:5173",
      "http://104.131.67.238:5555/",
      "http://104.131.67.238:5555",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/news", newsApiRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((error: any) => {
    console.log(error);
  });
