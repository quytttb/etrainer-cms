import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Button, Form, Input, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import request from "../../../api/request";
import { IGrammar } from "./service";
import TextArea from "antd/es/input/TextArea";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";

const AddGrammar = () => {
  const navigate = useNavigate();

  const addGrammarMutation = useMutation({
    mutationKey: ["ADD_GRAMMAR"],
    mutationFn: (values: IGrammar) => request.post("/grammar", values),
    onSuccess: () => {
      message.success("Thêm ngữ pháp thành công");
      navigate("/grammar");
    },
    onError: () => {
      message.error("Thêm ngữ pháp thất bại");
    },
  });

  const onSubmit = (values: IGrammar) => {
    addGrammarMutation.mutate(values);
  };

  return (
    <>
      <PageTitle
        title="Thêm ngữ pháp"
        renderButton={() => (
          <Link to="/grammar">
            <Button type="primary">Danh sách ngữ pháp</Button>
          </Link>
        )}
      />

      <Form
        className="!mt-6"
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          grammars: [
            {
              examples: [""],
            },
          ],
        }}
      >
        <FormWrapper>
          <Form.Item
            label="Chủ đề"
            name="topic"
            rules={[{ required: true, message: "Vui lòng nhập chủ đề" }]}
          >
            <Input placeholder="Nhập chủ đề" />
          </Form.Item>

          <Form.List name="grammars">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    className="border border-dashed border-gray-500 rounded-md p-3 mb-4 relative"
                  >
                    {fields.length > 1 && (
                      <div className="flex size-3 cursor-pointer absolute top-2 right-2 z-10">
                        <DeleteOutlined onClick={() => remove(name)} />
                      </div>
                    )}

                    <Form.Item
                      {...restField}
                      name={[name, "title"]}
                      label="Tiêu đề"
                      rules={[
                        { required: true, message: "Vui lòng nhập tiêu đề" },
                      ]}
                    >
                      <Input placeholder="Nhập tiêu đề" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "content"]}
                      label="Nội dung"
                      rules={[
                        { required: true, message: "Vui lòng nhập nội dung" },
                      ]}
                    >
                      <TextArea
                        placeholder="Nhập nội dung"
                        autoSize={{
                          minRows: 6,
                          maxRows: 6,
                        }}
                      />
                    </Form.Item>

                    <Form.List {...restField} name={[name, "examples"]}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div key={key} className="grid grid-cols-12 gap-4">
                              <Form.Item
                                {...restField}
                                name={name}
                                label="Ví dụ"
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập ví dụ",
                                  },
                                ]}
                                className="col-span-11"
                              >
                                <Input placeholder="Nhập ví dụ" />
                              </Form.Item>

                              {fields.length > 1 && (
                                <div className="flex">
                                  <DeleteOutlined
                                    onClick={() => remove(name)}
                                  />
                                </div>
                              )}
                            </div>
                          ))}

                          <Button type="dashed" onClick={() => add()} block>
                            Thêm ví dụ
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  className="mb-6"
                >
                  Thêm ngữ pháp
                </Button>
              </>
            )}
          </Form.List>
        </FormWrapper>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={addGrammarMutation.isPending}
            disabled={addGrammarMutation.isPending}
          >
            Thêm ngữ pháp
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddGrammar;
