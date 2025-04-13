import { Link } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Button, Table, TableProps } from "antd";
import { LESSON_TYPE_MAPPING } from "../../../constants/lesson-type";

interface IDataType {
  type: string;
  name: string;
}

const ListLesson = () => {
  const columns: TableProps<IDataType>["columns"] = [
    {
      title: "Loại bài học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <>
          <Link to={`/questions?type=${record.type}`}>
            <Button type="primary" size="small" className="ml-2">
              DS câu hỏi
            </Button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <PageTitle title="Bài học" />

      <Table
        columns={columns}
        dataSource={Object.entries(LESSON_TYPE_MAPPING).map(([key, value]) => ({
          type: key,
          name: value,
        }))}
        className="mt-4"
        rowKey="type"
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  );
};

export default ListLesson;
