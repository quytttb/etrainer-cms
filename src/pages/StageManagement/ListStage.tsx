import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, message, Popconfirm, Table, TableProps } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import request from "../../api/request";
import { getStageList, IStage } from "./service";

const ListStage = () => {
  const { data, refetch } = useQuery({
    queryKey: ["STAGE"],
    queryFn: getStageList,
  });

  const deleteStageMutation = useMutation({
    mutationKey: ["DELETE_STAGE"],
    mutationFn: (id: string) => request.delete(`/stages/${id}`),
    onSuccess: () => {
      message.success("Xoá giai đoạn thành công");
      refetch();
    },
    onError: () => {
      message.error("Xoá giai đoạn thất bại");
    },
  });

  const columns: TableProps<IStage>["columns"] = [
    {
      title: "Điểm tối thiểu",
      dataIndex: "minScore",
      key: "minScore",
    },
    {
      title: "Điểm mục tiêu",
      dataIndex: "targetScore",
      key: "targetScore",
    },
    {
      title: "Số ngày",
      dataIndex: "days",
      key: "days",
      render: (days) => days?.length || 0,
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
            title="Xoá giai đoạn này?"
            description="Không thể hoàn tác sau khi xoá"
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => deleteStageMutation.mutate(record._id)}
            okButtonProps={{
              loading: deleteStageMutation.isPending,
              disabled: deleteStageMutation.isPending,
            }}
          >
            <Button type="primary" size="small" className="ml-2" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Link to={`/stages/edit/${record._id}`}>
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
        title="Giai đoạn"
        renderButton={() => (
          <Link to="/stages/add">
            <Button type="primary">Thêm giai đoạn</Button>
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

export default ListStage;
