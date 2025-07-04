import { Button, Form, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import CustomRadio from "../../../components/CustomRadio/CustomRadio";

const Type4Form = () => {
  return (
    <div className="border border-gray-500 rounded-lg p-3 border-dashed mb-6 bg-white relative">
      <Form.Item
        name="question"
        label="Câu hỏi"
        rules={[{ required: true, message: "Vui lòng nhập câu hỏi" }]}
      >
        <TextArea
          placeholder="Nhập câu hỏi"
          autoSize={{ minRows: 3, maxRows: 3 }}
        />
      </Form.Item>

      <Form.Item
        name="subtitle"
        label="Phụ đề"
        rules={[{ required: true, message: "Vui lòng nhập phụ đề" }]}
      >
        <TextArea
          placeholder="Nhập phụ đề"
          autoSize={{ minRows: 4, maxRows: 10 }}
        />
      </Form.Item>

      <Form.Item
        name="explanation"
        label="Giải thích"
        rules={[{ required: true, message: "Vui lòng nhập giải thích" }]}
      >
        <TextArea
          placeholder="Nhập giải thích"
          autoSize={{ minRows: 4, maxRows: 10 }}
        />
      </Form.Item>

      <Form.List name="answers">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="flex gap-4">
                <Form.Item
                  {...restField}
                  name={[name, "isCorrect"]}
                  valuePropName="checked"
                >
                  <CustomRadio />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "answer"]}
                  rules={[{ required: true, message: "Vui lòng nhập đáp án" }]}
                  rootClassName="flex-1"
                >
                  <Input placeholder="Nhập đán án VD: A" />
                </Form.Item>

                {fields.length > 1 && (
                  <div className="flex mb-6">
                    <DeleteOutlined onClick={() => remove(name)} />
                  </div>
                )}
              </div>
            ))}

            <Form.Item>
              <Button onClick={() => add()} type="dashed" className="w-full">
                Thêm đáp án
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default Type4Form;
