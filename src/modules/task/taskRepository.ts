import { ObjectId, WithId } from 'mongodb';

import { database } from '@common/database/mongoConfig';
import { CreateTask, Task, TaskStatusType } from '@modules/task/taskModel';

export const taskRepository = {
  findAllAsync: async (): Promise<Task[]> => {
    return database.collection('tasks').find().toArray() as unknown as Task[];
  },

  findByIdAsync: async (id: string): Promise<Task | null> => {
    const task = await database.collection('tasks').findOne({
      _id: new ObjectId(id),
    });

    if (!task) return null;
    return task as WithId<Task>;
  },

  createAsync: async (task: CreateTask): Promise<Task> => {
    const taskObject: Partial<Task> = {
      ...task,
      status: 'NEW',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await database.collection('tasks').insertOne(taskObject);
    return taskObject as Task;
  },

  updateAsync: async (id: string, task: Task): Promise<Task | null> => {
    const taskObject: Partial<Task> = {
      image: task.image,
      title: task.title,
      status: task.status,
      updatedAt: new Date(),
      createdAt: task.createdAt,
      description: task.description,
    };

    const updatedTask = await database.collection('tasks').findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { $set: taskObject }
    );
    if (!updatedTask) return null;

    const updatedTaskObject = await database.collection('tasks').findOne({
      _id: new ObjectId(id),
    });

    return updatedTaskObject as WithId<Task>;
  },

  deleteAsync: async (id: string): Promise<boolean> => {
    const deletedTask = await database.collection('tasks').deleteOne({ id });
    return deletedTask.deletedCount === 1;
  },

  updateCompletedAsync: async (id: string, status: TaskStatusType): Promise<Task | null> => {
    const updatedTask = await database
      .collection('tasks')
      .findOneAndUpdate({ id }, { $set: { status, updatedAt: new Date() } });

    if (!updatedTask) return null;
    return updatedTask as WithId<Task>;
  },
};
