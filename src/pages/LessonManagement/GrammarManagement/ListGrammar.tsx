import { Link } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Button, message, Popconfirm, Table, TableProps } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import request from "../../../api/request";
import { getGrammarList, IGrammar } from "./service";

const ListGrammar = () => {
  const { data, refetch } = useQuery({
    queryKey: ["GRAMMAR"],
    queryFn: getGrammarList,
  });

  const deleteGrammarMutation = useMutation({
    mutationKey: ["DELETE_GRAMMAR"],
    mutationFn: (id: string) => request.delete(`/grammar/${id}`),
    onSuccess: () => {
      message.success("Xoá ngữ pháp thành công");
      refetch();
    },
    onError: () => {
      message.error("Xoá ngữ pháp thất bại");
    },
  });

  const columns: TableProps<IGrammar>["columns"] = [
    {
      title: "Chủ đề",
      dataIndex: "topic",
      key: "topic",
      width: "15%",
    },
    {
      title: "Ngữ pháp",
      key: "grammarCount",
      width: "30%",
      render: (_, record) =>
        record.grammars.map((grammar, idx) => (
          <div key={grammar.title}>
            <p>
              {idx + 1}. {grammar.title}
            </p>
          </div>
        )),
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
            title="Xoá ngữ pháp này?"
            description="Không thể hoàn tác sau khi xoá"
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => deleteGrammarMutation.mutate(record._id)}
            okButtonProps={{
              loading: deleteGrammarMutation.isPending,
              disabled: deleteGrammarMutation.isPending,
            }}
          >
            <Button type="primary" size="small" className="ml-2" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Link to={`/grammar/edit/${record._id}`}>
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
        title="Ngữ pháp"
        renderButton={() => (
          <Link to="/grammar/add">
            <Button type="primary">Thêm ngữ pháp</Button>
          </Link>
        )}
      />

      <Table
        columns={columns}
        dataSource={data}
        className="mt-4"
        rowKey="_id"
        pagination={{ hideOnSinglePage: true }}
        scroll={{ x: 800 }}
      />
    </>
  );
};

export default ListGrammar;
