import axios from 'axios';
// const axios = require('axios').default;

const instanse = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '3c7ff829-8a15-4900-9e4b-9ad587b249cf',
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instanse
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  getFolowed(userId) {
    return instanse.post(`follow/${userId}`).then((response) => response.data);
  },
  getUnFolowed(userId) {
    return instanse
      .delete(`follow/${userId}`)
      .then((response) => response.data);
  },
  getProfile(userId) {
    console.warn('Obsolete method/ Please profileApi object');
    return profileApi.getProfile(userId);
  },
};

export const profileApi = {
  getProfile(userId) {
    return instanse.get(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId) {
    return instanse.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return instanse.put('profile/status', { status: status });
  },
};

export const authAPI = {
  getAuth() {
    return instanse.get('auth/me');
  },
  login(email, password, rememberMe = false) {
    return instanse.post('/auth/login', { email, password, rememberMe });
  },
  logout() {
    return instanse.delete('/auth/login');
  },
};
