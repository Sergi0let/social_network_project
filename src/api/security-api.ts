// @ts-ignore
import { instanse } from './api.ts';

type GetCaptchaUrlResponseType = {
  url: string;
};

export const securityAPI = {
  getCaptchaUrl() {
    return instanse
      .get<GetCaptchaUrlResponseType>('security/get-captcha-url')
      .then((res) => res.data);
  },
};
