/**
 * Recursively removes `null` and `undefined` values from an object or array.
 * @param {any} obj - The object or array to clean.
 * @returns {any} A cleaned object or array without `null` or `undefined` values.
 */
export const cleanObject = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(cleanObject);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key] = cleanObject(value);
      }
      return acc;
    }, {} as any);
  }
  return obj;
};
