export type PostDataType = { id: number; message: string; likesCout: number };

export type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};
export type ProfileType = {
  userId: number;
  lookingForAJobDescription: boolean;
  lookingForAJob: boolean;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
};
export type UserType = {
  id: number | boolean;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};

export type UserFriendsType = {
  id: string;
  name: string;
};

export type ProfileInfoType = {
  profile: Array<ProfileType>;
  status: string;
  isOvner: boolean;
  savePhoto: (photo: any) => void;
  updateStatus: () => void;
  saveProfile: (form: Array<string>) => any;
  onMainPhotSelector: (e: React.ChangeEvent<HTMLInputElement>) => any;
};
