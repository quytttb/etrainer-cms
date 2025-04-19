import request from "../../api/request";

interface ILoginBody {
  email: string;
  password: string;
}

export const loginService = (
  data: ILoginBody
): Promise<{ token: string; isAdmin: boolean }> => {
  return request.post("/auth/login", data);
};
