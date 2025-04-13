import { Link } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
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
import request from "../../../api/request";
import { ILesson, getLessonList } from "./service";
import {
  LESSON_TYPE_MAPPING,
  LessonType,
} from "../../../constants/lesson-type";
import { useMemo } from "react";

const ListLesson = () => {
  const { data, refetch } = useQuery({
    queryKey: ["LESSONS"],
    queryFn: getLessonList,
  });

  const deleteLessonMutation = useMutation({
    mutationKey: ["DELETE_LESSON"],
    mutationFn: (id: string) => request.delete(`/lessons/${id}`),
    onSuccess: () => {
      message.success("Xoá bài học thành công");
      refetch();
    },
    onError: () => {
      message.error("Xoá bài học thất bại");
    },
  });

  const columns: TableProps<ILesson>["columns"] = [
    {
      title: "Loại bài học",
      dataIndex: "type",
      key: "type",
      render: (_, record) => LESSON_TYPE_MAPPING[record.type],
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Xoá bài học này?"
            description="Không thể hoàn tác sau khi xoá"
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => deleteLessonMutation.mutate(record._id)}
            okButtonProps={{
              loading: deleteLessonMutation.isPending,
              disabled: deleteLessonMutation.isPending,
            }}
          >
            <Button type="primary" size="small" className="ml-2" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Link to={`/lesson/edit/${record._id}?type=${record.type}`}>
            <Button type="primary" size="small" className="ml-2">
              Chỉnh sửa
            </Button>
          </Link>
        </>
      ),
    },
  ];

  const dropDownItems: MenuProps["items"] = useMemo(() => {
    const existingLessonTypes = data?.map((item) => item.type) || [];

    const lessonTypes = Object.keys(LESSON_TYPE_MAPPING).filter(
      (it) => !existingLessonTypes.includes(it as LessonType)
    );

    return lessonTypes.map((type) => ({
      key: type,
      label: (
        <Link to={`/lesson/add?type=${type}`}>
          {LESSON_TYPE_MAPPING[type as LessonType]}
        </Link>
      ),
    }));
  }, [data]);

  return (
    <>
      <PageTitle
        title="Bài học"
        renderButton={() => (
          <Dropdown
            menu={{
              items: dropDownItems,
            }}
            trigger={["click"]}
          >
            <Button type="primary">Thêm bài học</Button>
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

export default ListLesson;
