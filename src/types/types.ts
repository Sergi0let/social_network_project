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
};

export type UserFriendsType = {
  id: string;
  name: string;
};
