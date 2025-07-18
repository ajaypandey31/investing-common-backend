import { Request, Response } from "express";
import axios from "axios";
import News from "./newsApi.model";

export const fetchAndStoreNews = async (req: Request, res: Response): Promise<void> => {
  const { symbol, from, to, limit = 50, offset = 0 } = req.query;

  if (!symbol || !from || !to) {
    res.status(400).json({ error: "Missing required query parameters" });
    return;
  }

  try {
    const response = await axios.get(
      `https://eod-historical-data.p.rapidapi.com/news?s=${symbol}&from=${from}&to=${to}&limit=${limit}&offset=${offset}`,
      {
        headers: {
          "x-rapidapi-host": "eod-historical-data.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
        },
      }
    );

    const articles = response.data;

    for (const article of articles) {
      await News.findOneAndUpdate(
        { link: article.link },
        article,
        { upsert: true, new: true }
      );
    }

    res.status(200).json(articles);
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
