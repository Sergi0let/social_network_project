// @ts-ignore
import { instanse, GetItemsType } from './api.ts';

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instanse
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  getFolowed(userId) {
    return instanse.post(`follow/${userId}`);
  },
  getUnFolowed(userId) {
    return instanse.delete(`follow/${userId}`);
  },
};
