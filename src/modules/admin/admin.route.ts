import express from "express";
import { loginAdmin } from "./admin.controller";

const router = express.Router();

router.post("/login", loginAdmin);

export default router;