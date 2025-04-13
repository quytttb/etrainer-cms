import request from "../../api/request";
import { LessonType } from "../../constants/lesson-type";
import { IQuestion } from "../QuestionManagement/service";

export interface IExam {
  _id: string;
  name: string;
  examTime: number;
  sections: {
    type: LessonType;
    questions: IQuestion[];
  }[];
}

export const getExamList = async (): Promise<IExam[]> => {
  return request.get("/exam");
};

export const getExamById = async (id: string): Promise<IExam> => {
  return request.get(`/exam/${id}`);
};
