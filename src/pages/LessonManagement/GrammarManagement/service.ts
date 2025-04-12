import request from "../../../api/request";

export interface IGrammar {
  _id: string;
  title: string;
  explanation: string;
  examples: string[];
  createdAt: string;
  updatedAt: string;
}

export const getGrammarList = async (): Promise<IGrammar[]> => {
  return request.get("/grammar");
};

export const getGrammarById = async (id: string): Promise<IGrammar> => {
  return request.get(`/grammar/${id}`);
};
