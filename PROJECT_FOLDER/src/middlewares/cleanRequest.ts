import { Request, Response, NextFunction } from "express";
import { cleanObject } from "../utils/cleanObject";

/**
 * Middleware to remove `null` and `undefined` values from the request body.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const cleanRequestBody = (
  req: Request<any>,
  res: Response,
  next: NextFunction
) => {
  if (req.body && typeof req.body === "object") {
    req.body = cleanObject(req.body);
  }
  next();
};
