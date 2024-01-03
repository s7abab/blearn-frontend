import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface MonthCount {
  month: number;
  count: number;
}

interface UserDataChartProps {
  data: MonthCount[];
}

const UserDataChart = ({ data }: UserDataChartProps) => {
  const [selectedYear, setSelectedYear] = useState<number>(2024); // Initial selected year

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = parseInt(event.target.value, 10);
    setSelectedYear(selected);
  };

  const filteredData = data.filter(
    (item) => new Date().getFullYear() === selectedYear
  );

  const chartData = filteredData.map((item) => ({
    month: getMonthName(item.month), // Convert month number to month name
    count: item.count,
  }));

  function getMonthName(month: number) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month - 1]; // Adjust month number to array index
  }

  return (
    <div>
      <div>
        <label>Select Year:</label>
        <select
          className="rounded-full bg-[#8884d8] ml-2 text-gray-50"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
          {/* Add more years as needed */}
        </select>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserDataChart;
