import axios from 'axios';

import { UserType } from '../types/types';

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

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
