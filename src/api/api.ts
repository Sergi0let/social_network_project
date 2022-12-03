import axios from 'axios';

export const instanse = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '5d642510-cfb0-44e2-938f-32b971c98d42',
  },
});

export enum ResultCodeEnum {
  Succes = 0,
  Error = 1,
}
