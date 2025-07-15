import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err);
  errorResponse(res, "Internal server error", 500, err.message);
};
