import request from "../../api/request";

// Interface used for API responses
interface IQuestion {
  _id: string;
  type: string;
}

// Interface for API responses
export interface IDayItem {
  dayNumber: number;
  questions: IQuestion[];
}

// Interface for API responses
export interface IStage {
  _id: string;
  minScore: number;
  targetScore: number;
  days: IDayItem[];
  createdAt?: string;
  updatedAt?: string;
}

// Interface for creating a new stage (payload)
export interface ICreateStagePayload {
  minScore: number;
  targetScore: number;
  days: {
    dayNumber: number;
    questions: string[]; // Array of question IDs
  }[];
}

// Interface for updating an existing stage
export interface IUpdateStagePayload {
  minScore: number;
  targetScore: number;
  days: {
    dayNumber: number;
    questions: string[]; // Array of question IDs
  }[];
}

export const getStageList = async (): Promise<IStage[]> => {
  return request.get("/stages");
};

export const getStageById = async (id: string): Promise<IStage> => {
  return request.get(`/stages/${id}`);
};

export const createStage = async (
  data: ICreateStagePayload
): Promise<IStage> => {
  return request.post("/stages", data);
};

export const updateStage = async (
  id: string,
  data: IUpdateStagePayload
): Promise<IStage> => {
  return request.put(`/stages/${id}`, data);
};
