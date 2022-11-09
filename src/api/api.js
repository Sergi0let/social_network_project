import axios from 'axios';

const instanse = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '5d642510-cfb0-44e2-938f-32b971c98d42',
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
    return instanse.get(`profile/${userId}`);
  },
  getStatus(userId) {
    return instanse.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return instanse.put('profile/status', { status });
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
