import request from "../../api/request";

export interface IUser {
  name: string;
  email: string;
  avatarUrl: string;
  dateOfBirth: string;
  level: string;
  role: string;
  registrationMethod: "EMAIL" | "GOOGLE";
  gender: "MALE" | "FEMALE" | "OTHER";
}

export const getUsers = async (): Promise<IUser[]> => {
  return request.get("/users");
};
