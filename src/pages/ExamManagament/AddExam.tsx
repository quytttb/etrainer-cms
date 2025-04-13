import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, Form, Input, InputNumber, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import request from "../../api/request";
import { IExam } from "./service";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import { LESSON_TYPE_MAPPING } from "../../constants/lesson-type";
import SelectQuestions from "./SelectQuestions/SelectQuestions";

const AddExam = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const addExamMutation = useMutation({
    mutationKey: ["ADD_EXAM"],
    mutationFn: (values: IExam) => request.post("/exam", values),
    onSuccess: () => {
      message.success("Thêm đề thi thành công");
      navigate("/exam");
    },
    onError: () => {
      message.error("Thêm đề thi thất bại");
    },
  });

  const onSubmit = (values: IExam) => {
    addExamMutation.mutate(values);
  };

  return (
    <>
      <PageTitle
        title="Thêm đề thi"
        renderButton={() => (
          <Link to="/exam">
            <Button type="primary">Danh sách đề thi</Button>
          </Link>
        )}
      />

      <Form
        className="!mt-6"
        layout="vertical"
        form={form}
        initialValues={{
          sections: Object.entries(LESSON_TYPE_MAPPING).map(([key, label]) => ({
            type: key,
            name: label,
          })),
        }}
        onFinish={onSubmit}
      >
        <FormWrapper>
          <Form.Item
            label="Tên đề thi"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên đề thi" }]}
          >
            <Input placeholder="Nhập tên đề thi" />
          </Form.Item>

          <Form.Item
            label="Thời gian làm bài (Phút)"
            name="duration"
            rules={[
              { required: true, message: "Vui lòng nhập thời gian làm bài" },
            ]}
          >
            <InputNumber
              placeholder="Nhập thời gian làm bài"
              className="!w-full"
            />
          </Form.Item>

          <Form.List name="sections">
            {(fields) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key}>
                    <p className="mb-2">
                      Phần {name + 1}:{" "}
                      {form.getFieldValue("sections")[name].name}
                    </p>

                    <Form.Item
                      {...restField}
                      name={[name, "questions"]}
                      label="Câu hỏi"
                      rules={[
                        { required: true, message: "Vui lòng chọn câu hỏi" },
                      ]}
                    >
                      <SelectQuestions
                        type={form.getFieldValue("sections")[name].type}
                      />
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </FormWrapper>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={addExamMutation.isPending}
            disabled={addExamMutation.isPending}
          >
            Thêm đề thi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddExam;
