import { Task } from '@modules/task/taskModel';

/* export const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 42, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 21, createdAt: new Date(), updatedAt: new Date() },
]; */

export const tasks: Task[] = [
  {
    id: 1,
    image: 'https://example.com/image1.png',
    title: 'Task 1',
    description: 'Description for Task 1',
    createdAt: new Date(),
    updatedAt: new Date(),
    completed: false,
    // dueDate: new Date(),
  },
  {
    id: 2,
    image: 'https://example.com/image2.png',
    title: 'Task 2',
    description: 'Description for Task 2',
    createdAt: new Date(),
    updatedAt: new Date(),
    completed: true,
  },
];

export const taskRepository = {
  findAllAsync: async (): Promise<Task[]> => {
    return tasks;
  },

  findByIdAsync: async (id: number): Promise<Task | null> => {
    return tasks.find((task) => task.id === id) || null;
  },

  createAsync: async (task: Task): Promise<Task> => {
    tasks.push(task);
    return task;
  },

  updateAsync: async (id: number, task: Task): Promise<Task | null> => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return null;
    }

    tasks[index] = task;
    return task;
  },

  deleteAsync: async (id: number): Promise<boolean> => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }

    tasks.splice(index, 1);
    return true;
  },
};
