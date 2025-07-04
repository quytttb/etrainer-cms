import { Button, Form, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import CustomRadio from "../../../../components/CustomRadio/CustomRadio";

const Type5Form = () => {
  return (
    <Form.List name="questions">
      {(fields, { add, remove }) => (
        <div className="mb-6">
          {fields.map(({ key, name, ...restField }) => (
            <div
              key={key}
              className="border border-gray-500 rounded-lg p-3 border-dashed mb-6 bg-white relative"
            >
              {fields.length > 1 && (
                <div className="absolute top-3 right-3 cursor-pointer z-10">
                  <DeleteOutlined onClick={() => remove(name)} />
                </div>
              )}

              <Form.Item
                {...restField}
                name={[name, "question"]}
                label="Đoạn văn"
                rules={[
                  { required: true, message: "Vui lòng nhập đoạn văn bản" },
                ]}
              >
                <TextArea
                  placeholder="Nhập đoạn văn bản"
                  autoSize={{ minRows: 5, maxRows: 10 }}
                />
              </Form.Item>

              <Form.List {...restField} name={[name, "questions"]}>
                {(fields2, { add, remove }) => (
                  <>
                    {fields2.map(
                      ({ key: key2, name: name2, ...restField2 }) => (
                        <div
                          key={key2}
                          className="border border-gray-300 p-2 rounded-lg border-dashed mb-4 relative"
                        >
                          {fields2.length > 1 && (
                            <div className="absolute top-1.5 right-1.5 cursor-pointer z-10">
                              <DeleteOutlined onClick={() => remove(name2)} />
                            </div>
                          )}

                          <Form.Item
                            {...restField2}
                            name={[name2, "question"]}
                            label={`Câu hỏi ${name2 + 1}`}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập câu hỏi",
                              },
                            ]}
                          >
                            <Input placeholder="Nhập câu hỏi" />
                          </Form.Item>

                          <Form.List {...restField2} name={[name2, "answers"]}>
                            {(fields3, { add, remove }) => (
                              <>
                                {fields3.map(
                                  ({
                                    key: key3,
                                    name: name3,
                                    ...restField3
                                  }) => (
                                    <div key={key3} className="flex gap-4">
                                      <Form.Item
                                        {...restField3}
                                        name={[name3, "isCorrect"]}
                                        valuePropName="checked"
                                      >
                                        <CustomRadio />
                                      </Form.Item>

                                      <Form.Item
                                        {...restField3}
                                        name={[name3, "answer"]}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Vui lòng nhập đáp án",
                                          },
                                        ]}
                                        rootClassName="flex-1"
                                      >
                                        <Input placeholder="Nhập đán án VD: A" />
                                      </Form.Item>

                                      {fields3.length > 1 && (
                                        <div className="flex mb-6">
                                          <DeleteOutlined
                                            onClick={() => remove(name3)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )
                                )}

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
                      )
                    )}

                    <Form.Item>
                      <Button
                        onClick={() => add()}
                        type="dashed"
                        className="w-full"
                      >
                        Thêm câu hỏi
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

export default Type5Form;
