import { Button, Form, Input } from "antd";
import UploadFormItem from "../../../../components/UploadFormItem/UploadFormItem";
import { DeleteOutlined } from "@ant-design/icons";
import CustomRadio from "../../../../components/CustomRadio/CustomRadio";

const Type2Form = () => {
  return (
    <Form.List name="questions">
      {(fields1, { add, remove }) => (
        <div className="mb-6">
          {fields1.map(({ key: key1, name: name1, ...restField1 }) => (
            <div
              key={key1}
              className="border border-gray-500 rounded-lg p-3 border-dashed mb-6 bg-white relative"
            >
              {fields1.length > 1 && (
                <div className="absolute top-3 right-3 cursor-pointer z-10">
                  <DeleteOutlined onClick={() => remove(name1)} />
                </div>
              )}

              <Form.Item
                {...restField1}
                name={[name1, "audio"]}
                label="Audio"
                rules={[
                  { required: true, message: "Vui lòng chọn file audio" },
                ]}
              >
                <UploadFormItem accept="audio/*" />
              </Form.Item>

              <Form.List {...restField1} name={[name1, "answers"]}>
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
                          rules={[
                            { required: true, message: "Vui lòng nhập đáp án" },
                          ]}
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
                      <Button
                        onClick={() => add()}
                        type="dashed"
                        className="w-full"
                      >
                        Thêm đáp án
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          ))}
          <Button type="dashed" onClick={() => add()} block>
            Thêm câu hỏi
          </Button>
        </div>
      )}
    </Form.List>
  );
};

export default Type2Form;
