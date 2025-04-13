import request from "../../../api/request";
import { LessonType } from "../../../constants/lesson-type";

interface Answer {
  answer: string;
  isCorrect: boolean;
}

interface NestedQuestion {
  question: string;
  answers: Answer[];
}

interface Question {
  question?: string | null;
  audio?: {
    name: string;
    url: string;
  };
  imageUrl?: string | null;
  answers?: Answer[] | null;
  questions?: NestedQuestion[] | null;
}

export interface ILesson {
  _id: string;
  type: LessonType;
  questions: Question[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const getLessonList = async (): Promise<ILesson[]> => {
  return request.get("/lessons");
};

export const getLessonById = async (id: string): Promise<ILesson> => {
  return request.get(`/lessons/${id}`);
};
