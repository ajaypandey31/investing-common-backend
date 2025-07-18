import express from "express";
import { fetchAndStoreNews } from "./newsApi.controller";

const router = express.Router();

router.get("/stock-news", fetchAndStoreNews);

export default router;
