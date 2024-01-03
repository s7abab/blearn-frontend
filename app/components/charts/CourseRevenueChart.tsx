import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: number[];
}

const CourseRevenueChart = ({ data }: Props) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedYear, setSelectedYear] = useState<number>(2024); // Initial selected year
  const [chartData, setChartData] = useState<
    { month: string; revenue: number | undefined }[]
  >([]);

  useEffect(() => {
    const generateChartData = () => {
      const chartData = months.map((month, index) => ({
        month,
        revenue: data?.[index + (selectedYear - 2024) * 12], // Adjust index based on selected year
      }));
      setChartData(chartData);
    };

    generateChartData();
    // eslint-disable-next-line
  }, [data, selectedYear]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = parseInt(event.target.value, 10);
    setSelectedYear(selected);
  };

  return (
    <div>
      <div>
        <label>Select Year:</label>
        <select className="rounded-full ml-2 bg-[#8884d8] mb-2 text-gray-50" value={selectedYear} onChange={handleYearChange}>
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
          {/* Add more years as needed */}
        </select>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseRevenueChart;
