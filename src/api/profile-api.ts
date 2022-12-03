// @ts-ignore
import { instanse } from './api.ts';

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
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instanse.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  saveProfile(profile) {
    return instanse.put(`profile`, profile);
  },
};
