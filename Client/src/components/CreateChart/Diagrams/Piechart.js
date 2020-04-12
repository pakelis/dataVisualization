import React from "react";

//react-responsive
import { useMediaQuery } from "react-responsive";

//recharts
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Piechart = ({ chartData, indicator, chartNameField }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });

  console.log(chartData);

  return (
    <>
      {indicator.length != 0 ? (
        <div>
          <PieChart width={250} height={250}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#1DA57A"
              isAnimationActive={false}
            >
              {chartData != null
                ? chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))
                : null}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      ) : null}
    </>
  );
};

export default Piechart;
