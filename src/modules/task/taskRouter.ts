import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { ENDPOINTS } from '@common/consts';
import { commonValidations } from '@common/utils/commonValidation';
import { handleServiceResponse } from '@common/utils/httpHandlers';
import { createTaskSchema, Task, TaskSchema, TaskStatus, updateTaskSchema } from '@modules/task/taskModel';
import { taskService } from '@modules/task/taskService';

export const taskRegistry = new OpenAPIRegistry();

taskRegistry.register('Task', TaskSchema);

export const taskRouter: Router = (() => {
  const router = Router();

  // --- GET /tasks/{id} ---
  taskRegistry.registerPath({
    method: 'get',
    tags: ['Tasks'],
    path: ENDPOINTS.TASKS.GET_TASK_BY_ID,
    request: {
      params: z.object({
        id: commonValidations.objectIdSchema,
      }),
    },
    responses: createApiResponse(TaskSchema, 'Success'),
  });
  router.get('/:id', async (req, res) => {
    const serviceResponse = await taskService.findById(req.params.id);
    handleServiceResponse(serviceResponse, res);
  });

  // --- GET /tasks ---
  taskRegistry.registerPath({
    method: 'get',
    tags: ['Tasks'],
    path: ENDPOINTS.TASKS.GET_TASKS,
    responses: createApiResponse(z.array(TaskSchema), 'Success'),
  });
  router.get('/', async (_req, res) => {
    const serviceResponse = await taskService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  // --- POST /tasks ---
  taskRegistry.registerPath({
    method: 'post',
    tags: ['Tasks'],
    path: ENDPOINTS.TASKS.POST_TASK,
    request: {
      body: {
        content: {
          'application/json': {
            schema: createTaskSchema,
          },
        },
        description: 'Task to create',
        required: true,
      },
    },
    responses: createApiResponse(TaskSchema, 'Success'),
  });
  router.post('/', async (req, res) => {
    const taskData = createTaskSchema.parse(req.body);
    const serviceResponse = await taskService.create(taskData);
    handleServiceResponse(serviceResponse, res);
  });

  // ----- PUT /tasks/{id} -----
  taskRegistry.registerPath({
    method: 'put',
    tags: ['Tasks'],
    path: ENDPOINTS.TASKS.UPDATE_TASK,
    request: {
      params: z.object({
        id: commonValidations.objectIdSchema,
      }),
      body: {
        content: {
          'application/json': {
            schema: updateTaskSchema,
          },
        },
        description: 'Task to update',
        required: true,
      },
    },
    responses: createApiResponse(TaskSchema, 'Success'),
  });
  router.put('/:id', async (req, res) => {
    const taskData = updateTaskSchema.parse(req.body) as Task;
    const serviceResponse = await taskService.update(req.params.id, taskData);
    handleServiceResponse(serviceResponse, res);
  });

  // --- PATCH /tasks/{id}/status ---
  taskRegistry.registerPath({
    method: 'patch',
    tags: ['Tasks'],
    path: ENDPOINTS.TASKS.PATCH_TASK_STATUS,
    request: {
      params: z.object({
        id: commonValidations.objectIdSchema,
      }),
      body: {
        content: {
          'application/json': {
            schema: z.object({
              status: TaskStatus,
            }),
          },
        },
        description: 'Task status to update',
        required: true,
      },
    },
    responses: createApiResponse(TaskSchema, 'Success'),
  });
  router.patch("'/:id/status'", async (req, res) => {
    const taskStatus = TaskStatus.parse(req.body.status);
    const serviceResponse = await taskService.updateStatus(req.params.id, taskStatus);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
