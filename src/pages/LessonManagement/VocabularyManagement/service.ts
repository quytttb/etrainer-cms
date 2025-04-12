import request from "../../../api/request";

export interface IVocabulary {
  _id: string;
  topicName: string;
  words: {
    _id: string;
    word: string;
    meaning: string;
    example: string;
  }[];
}

export const getVocabularyList = async (): Promise<IVocabulary[]> => {
  return request.get("/vocabulary");
};

export const getVocabularyById = async (id: string): Promise<IVocabulary> => {
  return request.get(`/vocabulary/${id}`);
};
