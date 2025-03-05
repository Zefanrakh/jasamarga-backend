import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { throwIfAnyDtoValidationErrors } from "../utils/throwIfAnyValidationErrors";

/**
 * Middleware to validate the request body against a specified DTO class.
 * Converts the request body into an instance of the DTO class, validates it,
 * and throws validation errors if any exist.
 *
 * @param {any} DtoClass - The DTO class to validate against.
 * @returns {(req: Request, res: Response, next: NextFunction) => Promise<void>} Express middleware function.
 */
export const validateDto = (DtoClass: any) => {
  return async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
      const dtoInstance = plainToInstance(DtoClass, req.body);
      const validationErrors = await validate(dtoInstance);
      throwIfAnyDtoValidationErrors(validationErrors);

      // Replace request body with the validated DTO instance
      req.body = dtoInstance;
      next();
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
};
