import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, Form, InputNumber, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { ICreateStagePayload, createStage } from "./service";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import DaysFormItem from "./DaysFormItem";

const AddStage = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const addStageMutation = useMutation({
    mutationKey: ["ADD_STAGE"],
    mutationFn: createStage,
    onSuccess: () => {
      message.success("Thêm giai đoạn thành công");
      navigate("/stages");
    },
    onError: () => {
      message.error("Thêm giai đoạn thất bại");
    },
  });

  const onSubmit = (values: ICreateStagePayload) => {
    addStageMutation.mutate(values);
  };

  return (
    <>
      <PageTitle
        title="Thêm giai đoạn"
        renderButton={() => (
          <Link to="/stages">
            <Button type="primary">Danh sách giai đoạn</Button>
          </Link>
        )}
      />

      <Form
        form={form}
        className="!mt-6"
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          minScore: 0,
          targetScore: 100,
          days: [
            {
              dayNumber: 1,
              questions: [],
            },
            {
              dayNumber: 2,
              questions: [],
            },
            {
              dayNumber: 3,
              questions: [],
            },
          ],
        }}
      >
        <FormWrapper>
          <Form.Item
            label="Điểm tối thiểu"
            name="minScore"
            rules={[
              { required: true, message: "Vui lòng nhập điểm tối thiểu" },
            ]}
          >
            <InputNumber
              placeholder="Nhập điểm tối thiểu"
              className="!w-full"
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="Điểm mục tiêu"
            name="targetScore"
            rules={[{ required: true, message: "Vui lòng nhập điểm mục tiêu" }]}
          >
            <InputNumber
              placeholder="Nhập điểm mục tiêu"
              className="!w-full"
              min={1}
            />
          </Form.Item>

          <Form.Item label="Các ngày">
            <DaysFormItem />
          </Form.Item>
        </FormWrapper>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={addStageMutation.isPending}
            disabled={addStageMutation.isPending}
          >
            Thêm giai đoạn
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddStage;
