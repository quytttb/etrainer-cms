import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Button, Form, Input, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getVocabularyById, IVocabulary } from "./service";
import { useMutation, useQuery } from "@tanstack/react-query";
import request from "../../../api/request";
import { useEffect } from "react";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";

const EditVocabulary = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [form] = Form.useForm();

  const { data } = useQuery({
    queryKey: ["VOCABULARY", id],
    queryFn: () => getVocabularyById(id as string),
    enabled: !!id,
  });

  const editVocabularyMutation = useMutation({
    mutationKey: ["EDIT_VOCABULARY"],
    mutationFn: (values: IVocabulary) => {
      return request.put(`/vocabulary/${id}`, values);
    },
    onSuccess: () => {
      message.success("Cập nhật từ vựng thành công");
      navigate("/vocabulary");
    },
    onError: () => {
      message.error("Cập nhật từ vựng thất bại");
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        topicName: data.topicName,
        words: data.words.map((word) => ({
          word: word.word,
          meaning: word.meaning,
          example: word.example,
        })),
      });
    }
  }, [data, form]);

  const onSubmit = (values: IVocabulary) => {
    editVocabularyMutation.mutate(values);
  };

  return (
    <>
      <PageTitle
        title="Cập nhật từ vựng"
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
        form={form}
      >
        <FormWrapper>
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
                      rules={[
                        { required: true, message: "Vui lòng nhập nghĩa" },
                      ]}
                    >
                      <Input placeholder="Nhập nghĩa" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "example"]}
                      label="Ví dụ"
                      rules={[
                        { required: true, message: "Vui lòng nhập ví dụ" },
                      ]}
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
        </FormWrapper>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={editVocabularyMutation.isPending}
            disabled={editVocabularyMutation.isPending}
          >
            Cập nhật từ vựng
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditVocabulary;
