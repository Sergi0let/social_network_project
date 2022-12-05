// @ts-ignore
import { instanse, GetItemsType, ResponseType } from './api.ts';

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instanse
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data);
  },
  getFolowed(userId) {
    return instanse
      .post<ResponseType>(`follow/${userId}`)
      .then((res) => res.data);
  },
  getUnFolowed(userId) {
    return instanse
      .delete(`follow/${userId}`)
      .then((res) => res.data) as Promise<ResponseType>;
  },
};
