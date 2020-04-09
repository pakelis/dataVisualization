import React from "react";
import CustomTooltip from "../CustomTooltip";

//react-responsive
import { useMediaQuery } from "react-responsive";

//recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Columnchart = ({ dataMax, chartData, customTooltipData }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });

  return (
    <ResponsiveContainer width="95%" height={850}>
      <BarChart width={1850} height={850} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={true} />
        <XAxis
          dataKey="name"
          angle={-90}
          interval={0}
          height={isTabletOrMobile ? 0 : 340}
          textAnchor="end"
        />
        <YAxis domain={[0, dataMax]} />
        {/* interval on axis shows all categories */}
        <Tooltip content={<CustomTooltip payload={customTooltipData} />} />
        {/* <CustomTooltip /> */}
        <Legend />
        <Bar dataKey="value" fill="#1DA57A" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Columnchart;
