import { Flex, Table, TableProps } from "antd";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { getUsers, IUser } from "./service";
import dayjs from "dayjs";

const UserManagement = () => {
  const { data } = useQuery({
    queryKey: ["USER_LIST"],
    queryFn: getUsers,
  });

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Họ và tên",
      key: "user",
      render: (_, record) => (
        <Flex align="center" gap={8}>
          <img
            src={record.avatarUrl}
            alt="Avatar"
            className="size-9 object-cover rounded-full"
          />

          <p>{record.name}</p>
        </Flex>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Trình độ",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        if (role === "ADMIN") {
          return <span className="text-red-500">Quản trị viên</span>;
        }
        return <span className="text-blue-500">Người dùng</span>;
      },
    },
  ];

  return (
    <>
      <PageTitle title="Người dùng" />

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

export default UserManagement;
