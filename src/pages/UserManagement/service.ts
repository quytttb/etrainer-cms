import request from "../../api/request";

export interface IUser {
  name: string;
  email: string;
  avatarUrl: string;
  dateOfBirth: string;
  level: string;
  role: string;
}

export const getUsers = (): Promise<IUser[]> => {
  return request.get("/users");
};
