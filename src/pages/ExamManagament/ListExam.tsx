import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, message, Popconfirm, Table, TableProps } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import request from "../../api/request";
import { getExamList, IExam } from "./service";

const ListExam = () => {
  const { data, refetch } = useQuery({
    queryKey: ["EXAM"],
    queryFn: getExamList,
  });

  const deleteExamMutation = useMutation({
    mutationKey: ["DELETE_EXAM"],
    mutationFn: (id: string) => request.delete(`/exam/${id}`),
    onSuccess: () => {
      message.success("Xoá đề thi thành công");
      refetch();
    },
    onError: () => {
      message.error("Xoá đề thi thất bại");
    },
  });

  const columns: TableProps<IExam>["columns"] = [
    {
      title: "Tên đề thi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng câu hỏi",
      key: "questions",
      render: (_, record) => {
        const totalQuestions = record.sections.reduce((acc, section) => {
          return acc + section.questions.length;
        }, 0);
        return totalQuestions;
      },
    },
    {
      title: "Thời gian làm bài (phút)",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => duration,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Xoá đề thi này?"
            description="Không thể hoàn tác sau khi xoá"
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => deleteExamMutation.mutate(record._id)}
            okButtonProps={{
              loading: deleteExamMutation.isPending,
              disabled: deleteExamMutation.isPending,
            }}
          >
            <Button type="primary" size="small" className="ml-2" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Link to={`/exam/edit/${record._id}`}>
            <Button type="primary" size="small" className="ml-2">
              Chỉnh sửa
            </Button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <PageTitle
        title="Đề thi"
        renderButton={() => (
          <Link to="/exam/add">
            <Button type="primary">Thêm đề thi</Button>
          </Link>
        )}
      />

      <Table
        columns={columns}
        dataSource={data}
        className="mt-4"
        rowKey="_id"
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  );
};

export default ListExam;
