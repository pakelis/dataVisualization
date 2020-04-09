import React from "react";

//react-responsive
import { useMediaQuery } from "react-responsive";

//recharts
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from "recharts";

const Piechart = ({ chartData }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });

  return (
    <ResponsiveContainer width="95%" height={750}>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          isAnimationActive={false}
        />
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Piechart;
