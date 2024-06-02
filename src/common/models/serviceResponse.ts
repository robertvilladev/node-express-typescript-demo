import { z } from 'zod';

export enum ResponseStatus {
  Success,
  Failed,
}

export class ServiceResponse<T = null> {
  success: boolean;
  message: string;
  response: T;
  statusCode: number;

  constructor(status: ResponseStatus, message: string, response: T, statusCode: number) {
    this.success = status === ResponseStatus.Success;
    this.message = message;
    this.response = response;
    this.statusCode = statusCode;
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    response: dataSchema.optional(),
    statusCode: z.number(),
  });
