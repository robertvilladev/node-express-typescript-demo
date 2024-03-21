import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { Task } from '@modules/task/taskModel';
import { taskRepository } from '@modules/task/taskRepository';
import { logger } from '@src/server';

export const taskService = {
  findAll: async (): Promise<ServiceResponse<Task[] | null>> => {
    try {
      const tasks = await taskRepository.findAllAsync();
      if (!tasks) {
        return new ServiceResponse(ResponseStatus.Failed, 'No tasks found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Task[]>(ResponseStatus.Success, 'Tasks found', tasks, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all tasks: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
