import React from "react";

//react-responsive
import { useMediaQuery } from "react-responsive";

//recharts
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from "recharts";

const Piechart = ({ chartData, indicator, chartNameField }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });

  return (
    <>
      {indicator.length != 0 ? (
        <div>
          {/* <ResponsiveContainer width={250} height={250}> */}
          <PieChart width={250} height={250}>
            <Pie
              data={[chartData]}
              dataKey={indicator[0]}
              nameKey="name"
              // cx="50%"
              // cy="50%"
              outerRadius={80}
              fill="#1DA57A"
              isAnimationActive={false}
            />
            <Tooltip />
            <Legend />
          </PieChart>
          {/* </ResponsiveContainer> */}
        </div>
      ) : null}
    </>
  );
};

export default Piechart;
