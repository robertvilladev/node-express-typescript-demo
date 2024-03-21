import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export type Task = z.infer<typeof TaskSchema>;

export const TaskSchema = z.object({
  id: z.number(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Optional fields
  dueDate: z.date().optional(),
  completed: z.boolean().optional().default(false),
});

// Input Validation for 'GET tasks/:id' endpoint
export const GetTaskSchema = z.object({
  params: z.object({ id: z.number() }),
});
