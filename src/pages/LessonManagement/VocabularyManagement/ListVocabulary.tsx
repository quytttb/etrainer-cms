import { Link } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Button, message, Popconfirm, Table, TableProps } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getVocabularyList, IVocabulary } from "./service";
import dayjs from "dayjs";
import request from "../../../api/request";

const ListVocabulary = () => {
  const { data, refetch } = useQuery({
    queryKey: ["VOCABULARY"],
    queryFn: getVocabularyList,
  });

  const deleteVocabularyMutation = useMutation({
    mutationKey: ["DELETE_VOCABULARY"],
    mutationFn: (id: string) => request.delete(`/vocabulary/${id}`),
    onSuccess: () => {
      message.success("Xoá từ vựng thành công");
      refetch();
    },
    onError: () => {
      message.error("Xoá từ vựng thất bại");
    },
  });

  const columns: TableProps<IVocabulary>["columns"] = [
    {
      title: "Tên chủ đề",
      dataIndex: "topicName",
      key: "topicName",
    },
    {
      title: "Số lượng từ",
      dataIndex: "words",
      key: "words",
      render: (words) => words.length,
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
            title="Xoá từ vựng này?"
            description="Không thể hoàn tác sau khi xoá"
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => deleteVocabularyMutation.mutate(record._id)}
            okButtonProps={{
              loading: deleteVocabularyMutation.isPending,
              disabled: deleteVocabularyMutation.isPending,
            }}
          >
            <Button type="primary" size="small" className="ml-2" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Link to={`/vocabulary/edit/${record._id}`}>
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
        title="Từ vựng"
        renderButton={() => (
          <Link to="/vocabulary/add">
            <Button type="primary">Thêm từ vựng</Button>
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

export default ListVocabulary;
