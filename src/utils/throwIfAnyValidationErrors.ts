import { ValidationError } from "class-validator";

/**
 * Throws an error if there are any validation errors in the provided DTO.
 * This function is used to handle validation errors from `class-validator` and
 * ensure a structured error response.
 *
 * @param {ValidationError[]} validationErrors - An array of validation errors.
 * @throws {Error} An error with status code `400` and validation error details if validation fails.
 */
export function throwIfAnyDtoValidationErrors(
  validationErrors: ValidationError[]
) {
  if (validationErrors.length > 0) {
    const validationError = new Error("Validation failed");
    (validationError as any).statusCode = 400;
    (validationError as any).details = validationErrors;
    throw validationError;
  }
}
