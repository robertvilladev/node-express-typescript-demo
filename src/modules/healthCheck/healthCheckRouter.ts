import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { ENDPOINTS } from '@common/consts';
import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { handleServiceResponse } from '@common/utils/httpHandlers';

export const healthCheckRegistry = new OpenAPIRegistry();

export const healthCheckRouter: Router = (() => {
  const router = express.Router();

  healthCheckRegistry.registerPath({
    method: 'get',
    tags: ['Health Check'],
    path: ENDPOINTS.HEALTH_CHECK.BASE,
    responses: createApiResponse(z.null(), 'Success'),
  });

  router.get('/', (_req: Request, res: Response) => {
    const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'Service is healthy', null, StatusCodes.OK);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
