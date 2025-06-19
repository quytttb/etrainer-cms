import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title as ChartTitle,
} from "chart.js";

import { getUserStats, MonthlyUser, GenderStats } from "./service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartTitle
);

const Dashboard = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyUser[]>([]);
  const [genderData, setGenderData] = useState<GenderStats>({
    male: 0,
    female: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getUserStats();
        setMonthlyData(data.usersByMonth);
        setGenderData(data.genderStats);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", error);
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;

  const lineData = {
    labels: monthlyData.map(
      (item) => `${item.year}-${item.month.toString().padStart(2, "0")}`
    ),
    datasets: [
      {
        label: "Số người dùng",
        data: monthlyData.map((item) => item.count),
        fill: false,
        borderColor: "rgb(59,130,246)",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const pieData = {
    labels: ["Nam", "Nữ"],
    datasets: [
      {
        data: [genderData.male, genderData.female],
        backgroundColor: ["#3b82f6", "#f472b6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <PageTitle title="Dashboard" />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Box 1: Line Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">📈 Thống kê người dùng 6 tháng gần nhất</h3>
          <Line data={lineData} />
        </div>

        {/* Box 2: Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">🧑‍🤝‍🧑 Thống kê giới tính người dùng</h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-72">
              <Pie data={pieData} />
            </div>
            <div className="text-lg space-y-2">
              <p>👨 Nam: <span className="font-bold">{genderData.male}</span></p>
              <p>👩 Nữ: <span className="font-bold">{genderData.female}</span></p>
              <p>📊 Tổng: <span className="font-bold">{genderData.total}</span></p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
