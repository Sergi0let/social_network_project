// @ts-ignore
import { instanse, ResponseType } from './api.ts';

type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseDataType = {
  userId: number;
};

export const authAPI = {
  getAuth() {
    return instanse
      .get<ResponseType<MeResponseDataType>>('auth/me')
      .then((res) => res.data);
  },
  login(email: string, password: string, rememberMe = false) {
    return instanse
      .post<ResponseType<LoginResponseDataType>>('auth/login', {
        email,
        password,
        rememberMe,
      })
      .then((res) => res.data);
  },
  logout() {
    return instanse.delete('auth/login');
  },
};
