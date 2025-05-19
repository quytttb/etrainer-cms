import { Button, Form, InputNumber, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getQuestionList } from "../QuestionManagement/service";
import { IDayItem } from "./service";
import { useCallback } from "react";
import { LESSON_TYPE_MAPPING } from "../../constants/lesson-type";

const DaysFormItem = () => {
  const { data: questions } = useQuery({
    queryKey: ["QUESTIONS_FOR_STAGE"],
    queryFn: () => getQuestionList({}),
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
          {fields.map(({ key, name, ...restField }, index) => (
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
                <strong>Ngày {index + 1}</strong>
              </div>

              <Form.Item
                {...restField}
                name={[name, "dayNumber"]}
                hidden
                initialValue={index + 1}
              >
                <InputNumber />
              </Form.Item>

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
                        {LESSON_TYPE_MAPPING[option.data.type] ||
                          option.data.type}
                      </span>
                    </div>
                  )}
                />
              </Form.Item>
            </div>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => {
                add({ dayNumber: fields.length + 1, questions: [] });
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
