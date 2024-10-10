export const ENDPOINTS = {
  HEALTH_CHECK: {
    BASE: '/health-check',
  },

  TASKS: {
    BASE: '/tasks',
    GET_TASKS: '/tasks',
    POST_TASK: '/tasks',
    UPDATE_TASK: '/tasks/{id}',
    GET_TASK_BY_ID: '/tasks/{id}',
    PATCH_TASK_STATUS: '/tasks/{id}/status',
  },
};
