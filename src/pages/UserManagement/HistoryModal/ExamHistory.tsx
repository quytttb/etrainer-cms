import { useQuery } from "@tanstack/react-query";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { getUserExamHistory, IExamResult } from "../service";

const columns: ColumnsType<IExamResult> = [
  {
    title: "Tên bài thi thử",
    key: "examName",
    render: (_, record) => record.exam.name,
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

interface ExamHistoryProps {
  userId: string;
}

const ExamHistory = ({ userId }: ExamHistoryProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["EXAM_HISTORY", userId],
    queryFn: () => getUserExamHistory(userId),
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

export default ExamHistory;
