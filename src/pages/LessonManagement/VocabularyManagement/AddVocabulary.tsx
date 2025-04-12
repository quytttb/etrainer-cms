import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Button, Form, Input, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { IVocabulary } from "./service";
import { useMutation } from "@tanstack/react-query";
import request from "../../../api/request";

const AddVocabulary = () => {
  const navigate = useNavigate();

  const addVocabularyMutation = useMutation({
    mutationKey: ["ADD_VOCABULARY"],
    mutationFn: (values: IVocabulary) => request.post("/vocabulary", values),
    onSuccess: () => {
      message.success("Thêm từ vựng thành công");
      navigate("/vocabulary");
    },
    onError: () => {
      message.error("Thêm từ vựng thất bại");
    },
  });

  const onSubmit = (values: IVocabulary) => {
    addVocabularyMutation.mutate(values);
  };

  return (
    <>
      <PageTitle
        title="Thêm từ vựng"
        renderButton={() => (
          <Link to="/vocabulary">
            <Button type="primary">Danh sách từ vựng</Button>
          </Link>
        )}
      />

      <Form
        className="!mt-6"
        layout="vertical"
        initialValues={{ words: [{}] }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Tên chủ đề"
          name="topicName"
          rules={[{ required: true, message: "Vui lòng nhập tên chủ đề" }]}
        >
          <Input placeholder="Nhập tên chủ đề" />
        </Form.Item>

        <Form.List name="words">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="grid grid-cols-4 gap-4">
                  <Form.Item
                    {...restField}
                    name={[name, "word"]}
                    label="Từ vựng"
                    rules={[
                      { required: true, message: "Vui lòng nhập từ vựng" },
                    ]}
                  >
                    <Input placeholder="Nhập từ vựng" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "meaning"]}
                    label="Nghĩa"
                    rules={[{ required: true, message: "Vui lòng nhập nghĩa" }]}
                  >
                    <Input placeholder="Nhập nghĩa" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "example"]}
                    label="Ví dụ"
                    rules={[{ required: true, message: "Vui lòng nhập ví dụ" }]}
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
                Thêm từ vựng
              </Button>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={addVocabularyMutation.isPending}
            disabled={addVocabularyMutation.isPending}
          >
            Thêm từ vựng
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddVocabulary;
