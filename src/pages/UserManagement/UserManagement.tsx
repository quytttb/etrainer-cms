import { Avatar, Flex, Table, TableProps } from "antd";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { getUsers, IUser } from "./service";
import dayjs from "dayjs";
import { MdHistory } from "react-icons/md";
import HistoryModal from "./HistoryModal/HistoryModal";

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
          {record.avatarUrl ? (
            <img
              src={record.avatarUrl}
              alt="Avatar"
              className="size-8 object-cover rounded-full"
            />
          ) : (
            <Avatar>{record.name.charAt(0)}</Avatar>
          )}

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
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "-",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "-"),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      render: (gender) => {
        if (!gender) return "-";

        if (gender === "MALE") {
          return <span className="text-blue-500">Nam</span>;
        } else if (gender === "FEMALE") {
          return <span className="text-red-500">Nữ</span>;
        } else {
          return <span className="text-gray-500">Khác</span>;
        }
      },
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
      title: "Phương thức đăng ký",
      dataIndex: "registrationMethod",
      key: "registrationMethod",
      render: (method) => {
        if (method === "EMAIL") {
          return <span className="text-blue-500">Email</span>;
        }
        return <span className="text-red-500">Google</span>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <HistoryModal userId={record._id}>
          <Flex
            className="size-8 cursor-pointer"
            align="center"
            justify="center"
          >
            <MdHistory className="text-xl" />
          </Flex>
        </HistoryModal>
      ),
    },
  ];

  return (
    <>
      <PageTitle title="Học viên" />

      <Table
        columns={columns}
        dataSource={data}
        className="mt-4"
        rowKey="_id"
        pagination={{ hideOnSinglePage: true }}
        scroll={{ x: 1200 }}
      />
    </>
  );
};

export default UserManagement;
