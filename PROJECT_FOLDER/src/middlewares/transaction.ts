import { Request, Response, NextFunction } from "express";
import sequelize from "../config/database";

/**
 * Middleware to start a new database transaction for the current request.
 * A transaction object is assigned to `req.transaction` so that it can be used
 * within the request lifecycle.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const startTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  req.transaction = transaction;
  next();
};
