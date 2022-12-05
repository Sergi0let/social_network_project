// @ts-ignore
import { instanse, ResponseType } from './api.ts';
import { PhotosType, ProfileType } from '../types/types';

type savePhotoResponseDataType = {
  photos: PhotosType;
};

export const profileApi = {
  getProfile(userId: number) {
    return instanse
      .get<ProfileType>(`profile/${userId}`)
      .then((res) => res.data);
  },
  getStatus(userId: number) {
    return instanse
      .get<string>(`profile/status/${userId}`)
      .then((res) => res.data);
  },
  updateStatus(status: string) {
    return instanse
      .put<ResponseType>('profile/status', { status })
      .then((res) => res.data);
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instanse
      .put<ResponseType<PhotosType>>('profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data);
  },
  saveProfile(profile) {
    return instanse
      .put<ResponseType<savePhotoResponseDataType>>(`profile`, profile)
      .then((res) => res.data);
  },
};
