import { Request, Response, NextFunction } from "express";

/**
 * Express error-handling middleware.
 * Logs errors, handles specific Sequelize errors, rolls back transactions, and sends an error response.
 *
 * @param {any} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // Handle Sequelize unique constraint errors
  if (err.name === "SequelizeUniqueConstraintError") {
    err.statusCode = 409;
    err.details = err.errors;
  }

  let statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  if (message === "Unauthorized") {
    statusCode = 401;
  }

  await req.transaction?.rollback();

  res
    .status(statusCode)
    .json({ message, code: err.code || null, details: err.details || null });
};
