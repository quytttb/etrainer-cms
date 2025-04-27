import { useQuery } from "@tanstack/react-query";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { getUserPracticeHistory, IPracticeHistory } from "../service";
import { LESSON_TYPE_MAPPING } from "../../../constants/lesson-type";

const columns: ColumnsType<IPracticeHistory> = [
  {
    title: "Tên bài luyện tập",
    dataIndex: "lessonType",
    key: "lessonType",
    render: (_, record) => LESSON_TYPE_MAPPING[record.lessonType],
  },
  {
    title: "Thời gian bắt đầu",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value: string) => dayjs(value).format("HH:mm DD/MM/YYYY"),
  },
  {
    title: "Số câu đúng",
    dataIndex: "correctAnswers",
    key: "correctAnswers",
    render: (value) => (
      <span className="font-semibold text-green-600">{value}</span>
    ),
  },
  {
    title: "Tổng số câu",
    dataIndex: "totalQuestions",
    key: "totalQuestions",
  },
  {
    title: "Tỉ lệ đúng",
    key: "accuracy",
    render: (_, record) => {
      return (
        <Tag color={record.accuracyRate >= 80 ? "green" : "orange"}>
          {record.accuracyRate}%
        </Tag>
      );
    },
  },
  {
    title: "Thời gian làm bài",
    key: "duration",
    render: (_, record) => {
      const start = dayjs(record.startTime);
      const end = dayjs(record.endTime);
      const durationSec = end.diff(start, "second");
      const min = Math.floor(durationSec / 60);
      const sec = durationSec % 60;
      return (
        <span>
          {min > 0 ? `${min} phút ` : ""}
          {sec} giây
        </span>
      );
    },
  },
];

interface PracticeHistoryProps {
  userId: string;
}

const PracticeHistory = ({ userId }: PracticeHistoryProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["PRACTICE_HISTORY", userId],
    queryFn: () => getUserPracticeHistory(userId),
    enabled: !!userId,
  });

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey="_id"
      scroll={{ y: "70vh" }}
      loading={isLoading}
    />
  );
};

export default PracticeHistory;
