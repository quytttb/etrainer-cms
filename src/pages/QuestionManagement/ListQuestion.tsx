import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Dropdown,
  MenuProps,
  message,
  Popconfirm,
  Table,
  TableProps,
} from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQuestionList, IQuestion } from "./service";
import request from "../../api/request";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useMemo } from "react";
import { LESSON_TYPE, LESSON_TYPE_MAPPING } from "../../constants/lesson-type";
import dayjs from "dayjs";

const ListQuestion = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") ?? "";

  const { data, refetch } = useQuery({
    queryKey: ["QUESTIONS", type],
    queryFn: () => getQuestionList({ type }),
  });

  const deleteQuestionMutation = useMutation({
    mutationKey: ["DELETE_QUESTION"],
    mutationFn: (id: string) => request.delete(`/question/${id}`),
    onSuccess: () => {
      message.success("Xoá câu hỏi thành công");
      refetch();
    },
    onError: () => {
      message.error("Xoá câu hỏi thất bại");
    },
  });

  const columns: TableProps<IQuestion>["columns"] = [
    {
      title: "Câu hỏi",
      dataIndex: "questionNumber",
      key: "questionNumber",
      render: (_, record) => `Câu ${record.questionNumber}`,
    },
    {
      title: "Loại câu hỏi",
      dataIndex: "type",
      key: "type",
      render: (_, record) => LESSON_TYPE_MAPPING[record.type],
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
            title="Xoá câu hỏi này?"
            description="Không thể hoàn tác sau khi xoá"
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => deleteQuestionMutation.mutate(record._id)}
            okButtonProps={{
              loading: deleteQuestionMutation.isPending,
              disabled: deleteQuestionMutation.isPending,
            }}
          >
            <Button type="primary" size="small" className="ml-2" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Link to={`/questions/edit/${record._id}?type=${record.type}`}>
            <Button type="primary" size="small" className="ml-2">
              Chỉnh sửa
            </Button>
          </Link>
        </>
      ),
    },
  ];

  const dropDownItems: MenuProps["items"] = useMemo(() => {
    if (type) return [];

    return Object.entries(LESSON_TYPE_MAPPING).map(([key, label]) => ({
      key,
      label: <Link to={`/questions/add?type=${key}`}>{label}</Link>,
    }));
  }, [type]);

  return (
    <>
      <PageTitle
        title={`Câu hỏi${
          type ? `: ${LESSON_TYPE_MAPPING[type as LESSON_TYPE]}` : ""
        }`}
        renderButton={() => (
          <Dropdown
            menu={{
              items: dropDownItems,
            }}
            trigger={["click"]}
          >
            <Button
              type="primary"
              onClick={() => {
                if (!type) return;
                navigate({
                  pathname: "/questions/add",
                  search: `?type=${type}`,
                });
              }}
            >
              Thêm câu hỏi
            </Button>
          </Dropdown>
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

export default ListQuestion;
