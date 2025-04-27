/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "../../api/request";
import { LESSON_TYPE } from "../../constants/lesson-type";

export interface IUser {
  _id: string;
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
  const r = await request.get("/users");

  return r.filter((user: IUser) => user.role !== "ADMIN");
};

export interface IPracticeHistory {
  _id: string;
  user: string;
  startTime: string;
  endTime: string;
  lessonType: LESSON_TYPE;
  totalQuestions: number;
  correctAnswers: number;
  accuracyRate: number;
  questionAnswers: any[];
  createdAt: string;
}

export const getUserPracticeHistory = (
  userId: string
): Promise<IPracticeHistory[]> => {
  return request.get("/practice/admin/history", {
    params: {
      userId,
    },
  });
};

export interface IExamResult {
  _id: string;
  startTime: string;
  endTime: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracyRate: number;
  sections: {
    type: LESSON_TYPE;
    questions: [];
  }[];
  exam: { name: string; createdAt: string };
  createdAt: string;
}

export const getUserExamHistory = (userId: string): Promise<IExamResult[]> => {
  return request.get("/exam-history/admin/history", {
    params: {
      userId,
    },
  });
};
