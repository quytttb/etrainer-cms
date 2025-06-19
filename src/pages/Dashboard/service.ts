import request from "../../api/request";

export interface MonthlyUser {
  year: number;
  month: number;
  count: number;
}

export interface GenderStats {
  male: number;
  female: number;
  total: number;
}

export interface IUserStatsResponse {
  usersByMonth: MonthlyUser[];
  genderStats: GenderStats;
}

export const getUserStats = async (): Promise<IUserStatsResponse> => {
  return request.get("/stats/user-stats");
};
