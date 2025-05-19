import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, Form, InputNumber, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getStageById, updateStage, IUpdateStagePayload } from "./service";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import { useEffect } from "react";
import DaysFormItem from "./DaysFormItem";

const EditStage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const { data } = useQuery({
    queryKey: ["STAGE", id],
    queryFn: () => getStageById(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      // Transform the data to match the expected format
      // We need to convert the questions array from objects to strings (IDs)
      const formattedData = {
        ...data,
        days: data.days.map((day) => ({
          ...day,
          questions: day.questions.map((q) => q._id), // Extract just the IDs
        })),
      };

      form.setFieldsValue(formattedData);
    }
  }, [data, form]);

  const editStageMutation = useMutation({
    mutationKey: ["EDIT_STAGE"],
    mutationFn: (values: IUpdateStagePayload) =>
      updateStage(id as string, values),
    onSuccess: () => {
      message.success("Cập nhật giai đoạn thành công");
      navigate("/stages");
    },
    onError: () => {
      message.error("Cập nhật giai đoạn thất bại");
    },
  });

  const onSubmit = (values: IUpdateStagePayload) => {
    editStageMutation.mutate(values);
  };

  return (
    <>
      <PageTitle
        title="Cập nhật giai đoạn"
        renderButton={() => (
          <Link to="/stages">
            <Button type="primary">Danh sách giai đoạn</Button>
          </Link>
        )}
      />

      <Form form={form} className="!mt-6" layout="vertical" onFinish={onSubmit}>
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
            loading={editStageMutation.isPending}
            disabled={editStageMutation.isPending}
          >
            Cập nhật giai đoạn
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditStage;
