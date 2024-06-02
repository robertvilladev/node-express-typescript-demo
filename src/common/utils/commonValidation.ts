import { z } from 'zod';

export const commonValidations = {
  objectIdSchema: z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
    message: 'Invalid ObjectId',
  }),
  requiredStringSchema: z.string().min(1),
  optionalStringSchema: z.string().optional(),
};
