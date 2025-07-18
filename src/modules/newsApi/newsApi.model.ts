import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  link: { type: String, required: true },
  symbols: [{ type: String }],
  tags: [{ type: String }],
  sentiment: {
    polarity: Number,
    neg: Number,
    neu: Number,
    pos: Number,
  },
});

const News = mongoose.model("News", newsSchema);
export default News;
