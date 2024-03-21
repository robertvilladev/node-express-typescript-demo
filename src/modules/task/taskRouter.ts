import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { ENDPOINTS } from '@common/consts';
import { handleServiceResponse } from '@common/utils/httpHandlers';
import { TaskSchema } from '@modules/task/taskModel';
import { taskService } from '@modules/task/taskService';

export const taskRegistry = new OpenAPIRegistry();

taskRegistry.register('Task', TaskSchema);

export const taskRouter: Router = (() => {
  const router = Router();

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

  return router;
})();
