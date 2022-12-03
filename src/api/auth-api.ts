// @ts-ignore
import { instanse } from './api.ts';

export const authAPI = {
  async getAuth() {
    const res = await instanse.get('auth/me');
    return res.data;
  },
  async login(email: string, password: string, rememberMe = false) {
    const res = await instanse.post('auth/login', {
      email,
      password,
      rememberMe,
    });

    return res.data;
  },
  logout() {
    return instanse.delete('auth/login');
  },
};
