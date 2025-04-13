export enum LESSON_TYPE {
  IMAGE_DESCRIPTION = "IMAGE_DESCRIPTION", // mô tả hình ảnh
  ASK_AND_ANSWER = "ASK_AND_ANSWER", // hỏi và đáp
  CONVERSATION_PIECE = "CONVERSATION_PIECE", // đoạn hội thoại
  SHORT_TALK = "SHORT_TALK", // bài nói chuyện ngắn
  FILL_IN_THE_BLANK_QUESTION = "FILL_IN_THE_BLANK_QUESTION", // điền vào câu
  FILL_IN_THE_PARAGRAPH = "FILL_IN_THE_PARAGRAPH", // điền vào đoạn văn
  READ_AND_UNDERSTAND = "READ_AND_UNDERSTAND", // đọc hiểu đoạn văn
}

export const LESSON_TYPE_MAPPING = {
  [LESSON_TYPE.IMAGE_DESCRIPTION]: "Mô tả hình ảnh",
  [LESSON_TYPE.ASK_AND_ANSWER]: "Hỏi & đáp",
  [LESSON_TYPE.CONVERSATION_PIECE]: "Đoạn hội thoại",
  [LESSON_TYPE.SHORT_TALK]: "Bài nói chuyện ngắn",
  [LESSON_TYPE.FILL_IN_THE_BLANK_QUESTION]: "Điền vào câu",
  [LESSON_TYPE.FILL_IN_THE_PARAGRAPH]: "Điền vào đoạn văn",
  [LESSON_TYPE.READ_AND_UNDERSTAND]: "Đọc hiểu đoạn văn",
};

export type LessonType = keyof typeof LESSON_TYPE;
