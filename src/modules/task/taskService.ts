import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { CreateTask, Task, TaskStatus, TaskStatusType } from '@modules/task/taskModel';
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

  findById: async (id: string): Promise<ServiceResponse<Task | null>> => {
    try {
      const task = await taskRepository.findByIdAsync(id);
      if (!task) {
        return new ServiceResponse(ResponseStatus.Failed, `Task with id ${id} not found`, null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Task>(ResponseStatus.Success, 'Task found', task, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding task by id: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  create: async (task: CreateTask): Promise<ServiceResponse<Task | null>> => {
    try {
      const newTask = await taskRepository.createAsync(task);
      return new ServiceResponse<Task>(ResponseStatus.Success, 'Task created', newTask, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Error creating task: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  updateStatus: async (id: string, status: TaskStatusType): Promise<ServiceResponse<Task | null>> => {
    try {
      if (!Object.values(TaskStatus).includes(status)) {
        return new ServiceResponse(ResponseStatus.Failed, `Invalid status: ${status}`, null, StatusCodes.BAD_REQUEST);
      }
      const updatedTask = await taskRepository.updateCompletedAsync(id, status);
      if (!updatedTask) {
        return new ServiceResponse(ResponseStatus.Failed, `Task with id ${id} not found`, null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Task>(ResponseStatus.Success, 'Task updated', updatedTask, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error updating task status: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
