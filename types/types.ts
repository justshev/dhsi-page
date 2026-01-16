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
