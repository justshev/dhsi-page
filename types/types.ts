import { string } from "yup";

export type RegisterUserPayload = {
  username: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
};

export type LoginUserPayload = {
  email: string;
  password: string;
};

export type ApiResponse = {
  status: string;
  message: string;
  data?: any;
};

export type MyResponse = {
  id: string;
  username: string;
  email: string;
};

export type CreateCoursePayload = {
  title: string;
  short_description: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  thumbnail: null | File;
  author: string;
};
