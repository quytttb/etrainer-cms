import { Select } from "antd";
import { LESSON_TYPE } from "../../../constants/lesson-type";
import { useQuery } from "@tanstack/react-query";
import { getQuestionList } from "../../QuestionManagement/service";

interface ISelectQuestionsProps {
  type: LESSON_TYPE;
  value?: string;
  onChange?: VoidFunction;
}

const SelectQuestions = ({ type, value, onChange }: ISelectQuestionsProps) => {
  const { data } = useQuery({
    queryKey: ["QUESTIONS", type],
    queryFn: () => getQuestionList({ type }),
  });

  return (
    <Select
      placeholder="Chọn câu hỏi"
      options={data?.map((it) => ({
        label: `Câu ${it.questionNumber}`,
        value: it._id,
      }))}
      mode="multiple"
      allowClear
      value={value}
      onChange={onChange}
    />
  );
};

export default SelectQuestions;
