import request from "../../../api/request";

export interface IGrammar {
  _id: string;
  topic: string;
  grammars: {
    title: string;
    content: string;
    examples: string[];
  }[];
  createdAt: string;
  updatedAt: string;
}

export const getGrammarList = async (): Promise<IGrammar[]> => {
  return request.get("/grammar");
};

export const getGrammarById = async (id: string): Promise<IGrammar> => {
  return request.get(`/grammar/${id}`);
};
