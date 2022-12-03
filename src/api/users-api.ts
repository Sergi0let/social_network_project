// @ts-ignore
import { instanse } from './api.ts';

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    const response = await instanse.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },
  async getFolowed(userId) {
    const response = await instanse.post(`follow/${userId}`);

    return response.data;
  },
  async getUnFolowed(userId) {
    const response = await instanse.delete(`follow/${userId}`);
    return response.data;
  },
};
