import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type TaskStatusType = z.infer<typeof TaskStatus>;

export const TaskStatus = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']);

export const TaskSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Optional fields
  dueDate: z.date().optional(),
  status: TaskStatus.optional().default('PENDING'),
});

export const createTaskSchema = TaskSchema.omit({ id: true, createdAt: true, updatedAt: true, status: true });
export const updateTaskSchema = TaskSchema.omit({ id: true, createdAt: true, updatedAt: true, image: true });
