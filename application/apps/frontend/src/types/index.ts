export type User = {
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type UserLoginPayload = {
  email: string;
  password: string;
};
