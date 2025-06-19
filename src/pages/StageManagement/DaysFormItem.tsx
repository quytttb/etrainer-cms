import { Button, Form, InputNumber, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getQuestionList } from "../QuestionManagement/service";
import { getExamList } from "../ExamManagament/service";
import { IDayItem } from "./service";
import { useCallback } from "react";
import { LESSON_TYPE_MAPPING } from "../../constants/lesson-type";

const DaysFormItem = () => {
  const { data: questions } = useQuery({
    queryKey: ["QUESTIONS_FOR_STAGE"],
    queryFn: () => getQuestionList({}),
  });

  const { data: exams } = useQuery({
    queryKey: ["EXAMS_FOR_STAGE"],
    queryFn: () => getExamList(),
  });

  const form = Form.useFormInstance();

  const updateDayNumbers = useCallback(() => {
    setTimeout(() => {
      const days = form.getFieldValue("days") || [];
      form.setFieldsValue({
        days: days.map((day: IDayItem, idx: number) => ({
          ...day,
          dayNumber: idx + 1,
        })),
      });
    }, 0);
  }, [form]);

  return (
    <Form.List name="days">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => {
            const days = form.getFieldValue("days") || [];
            const currentDay = days[index];
            const isFullTestDay = !!currentDay?.exam;

            return (
              <div
                key={key}
                className="border border-gray-300 p-3 mb-3 rounded-md relative"
              >
                <MinusCircleOutlined
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => {
                    remove(name);
                    updateDayNumbers();
                  }}
                />

                <div className="mb-2">
                  <strong>
                    {`Ngày ${index + 1}${isFullTestDay ? " (Full Test)" : ""}`}
                  </strong>
                </div>

                <Form.Item
                  {...restField}
                  name={[name, "dayNumber"]}
                  hidden
                  initialValue={index + 1}
                >
                  <InputNumber />
                </Form.Item>

                {isFullTestDay ? (
                  <Form.Item
                    {...restField}
                    name={[name, "exam"]}
                    label="Chọn đề thi"
                    rules={[{ required: true, message: "Vui lòng chọn đề thi" }]}
                  >
                    <Select
                      placeholder="Chọn 1 đề thi"
                      style={{ width: "100%" }}
                      options={exams?.map((exam) => ({
                        label: exam.name,
                        value: exam._id,
                      }))}
                    />
                  </Form.Item>
                ) : (
                  <Form.Item
                    {...restField}
                    name={[name, "questions"]}
                    label="Câu hỏi"
                    rules={[{ required: true, message: "Vui lòng chọn câu hỏi" }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Chọn câu hỏi"
                      style={{ width: "100%" }}
                      optionFilterProp="label"
                      options={questions?.map((q) => ({
                        label: `Câu ${q.questionNumber}`,
                        value: q._id,
                        type: q.type,
                      }))}
                      optionRender={(option) => (
                        <div className="flex justify-between items-center">
                          <span>{option.label}</span>
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-md">
                            {LESSON_TYPE_MAPPING[option.data.type] || option.data.type}
                          </span>
                        </div>
                      )}
                    />
                  </Form.Item>
                )}
              </div>
            );
          })}

          <Form.Item>
            <Button
              type="dashed"
              onClick={() => {
                const days = form.getFieldValue("days") || [];
                const lastDay = days[days.length - 1];
                const hasFullTest = !!lastDay?.exam;

                if (hasFullTest) {
                  // Thêm ngày học thường trước Full Test
                  const newDays = [...days];
                  newDays.splice(days.length - 1, 0, {
                    dayNumber: days.length,
                    questions: [],
                  });
                  form.setFieldsValue({ days: newDays });
                } else {
                  // Thêm ngày Full Test
                  add({ dayNumber: days.length + 1, exam: null });
                }

                updateDayNumbers();
              }}
              block
              icon={<PlusOutlined />}
            >
              Thêm ngày
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default DaysFormItem;
