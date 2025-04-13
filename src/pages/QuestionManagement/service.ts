import request from "../../api/request";
import { LessonType } from "../../constants/lesson-type";

interface Answer {
  answer: string;
  isCorrect: boolean;
}

interface NestedQuestion {
  question: string;
  answers: Answer[];
}

export interface IQuestion {
  _id: string;
  questionNumber: number;
  type: LessonType;
  question?: string | null;
  audio?: {
    name: string;
    url: string;
  };
  imageUrl?: string | null;
  answers?: Answer[] | null;
  questions?: NestedQuestion[] | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IGetQuestionParams {
  type?: string;
}

export const getQuestionList = async (
  params?: IGetQuestionParams
): Promise<IQuestion[]> => {
  return request.get("/question", { params });
};

export const getQuestionById = async (id: string): Promise<IQuestion> => {
  return request.get(`/question/${id}`);
};
