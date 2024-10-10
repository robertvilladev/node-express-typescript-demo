import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type TaskStatusType = z.infer<typeof TaskStatus>;
export const TaskStatus = z.enum(['NEW', 'IN_PROGRESS', 'COMPLETED']);

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  image: z.string().optional(),
  status: TaskStatus.optional().default('NEW'),
});

export const createTaskSchema = TaskSchema.omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  image: true,
  description: true,
});

export const updateTaskSchema = TaskSchema.omit({
  id: true,
  image: true,
  createdAt: true,
  updatedAt: true,
  description: true,
});
