import axios from 'axios';
// @ts-ignore
import { ProfileInfoType, ContactsType } from '../types/types.ts';

const instanse = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '5d642510-cfb0-44e2-938f-32b971c98d42',
  },
});

type getUsersType = {
  currentPage: number;
  pageSize: number;
};

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instanse
      .get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  getFolowed(userId: number) {
    return instanse
      .post<number>(`follow/${userId}`)
      .then((response) => response.data);
  },
  getUnFolowed(userId: number) {
    return instanse
      .delete<number>(`follow/${userId}`)
      .then((response) => response.data);
  },
  getProfile(userId: number) {
    console.warn('Obsolete method/ Please profileApi object');
    return profileApi.getProfile(userId);
  },
};

type saveProfileType = {
  userId: number;
  lookingForAJobDescription: boolean;
  lookingForAJob: boolean;
  fullName: string;
  contacts: ContactsType;
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export const profileApi = {
  getProfile(userId: number) {
    return instanse.get<number>(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instanse.get<number>(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instanse.put<string>('profile/status', { status });
  },
  savePhoto(photoFile: string) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instanse.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  saveProfile(profile: ProfileInfoType) {
    return instanse.put<saveProfileType>(`profile`, profile);
  },
};

export enum ResultCodeEnum {
  Succes = 0,
  Error = 1,
}

type getAuthType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};
type getLoginType = {
  data: {
    userId: number;
  };
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};

export const authAPI = {
  getAuth() {
    return instanse.get<getAuthType>('auth/me').then((res) => res.data);
  },
  login(email: string, password: string, rememberMe = false) {
    return instanse
      .post<getLoginType>('/auth/login', {
        email,
        password,
        rememberMe,
      })
      .then((res) => res.data);
  },
  logout() {
    return instanse.delete<string>('/auth/login');
  },
};
