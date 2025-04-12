import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Button, Form, Input, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import request from "../../../api/request";
import { IGrammar } from "./service";
import TextArea from "antd/es/input/TextArea";

const AddGrammar = () => {
  const navigate = useNavigate();

  const addGrammarMutation = useMutation({
    mutationKey: ["ADD_GRAMMAR"],
    mutationFn: (values: IGrammar) => request.post("/grammar", values),
    onSuccess: () => {
      message.success("Thêm từ vựng thành công");
      navigate("/grammar");
    },
    onError: () => {
      message.error("Thêm từ vựng thất bại");
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
        initialValues={{ examples: [""] }}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>

        <Form.Item
          name="explanation"
          label="Giải thích"
          rules={[{ required: true, message: "Vui lòng nhập giải thích" }]}
        >
          <TextArea
            placeholder="Nhập giải thích"
            autoSize={{
              minRows: 6,
              maxRows: 6,
            }}
          />
        </Form.Item>

        <Form.List name="examples">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="grid grid-cols-12 gap-4">
                  <Form.Item
                    {...restField}
                    name={name}
                    label="Ví dụ"
                    rules={[{ required: true, message: "Vui lòng nhập ví dụ" }]}
                    className="col-span-11"
                  >
                    <Input placeholder="Nhập ví dụ" />
                  </Form.Item>

                  {fields.length > 1 && (
                    <div className="flex">
                      <DeleteOutlined onClick={() => remove(name)} />
                    </div>
                  )}
                </div>
              ))}

              <Button
                type="dashed"
                onClick={() => add()}
                block
                className="mb-6"
              >
                Thêm ví dụ
              </Button>
            </>
          )}
        </Form.List>

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
