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

const Barchart = ({
  dataMax,
  chartData,
  customTooltipData,
  indicator,
  chartNameField,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });

  return (
    <ResponsiveContainer width="95%" height={1800}>
      <BarChart width={850} height={1800} data={chartData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" vertical={true} />
        <XAxis type="number" domain={[0, dataMax]} />
        <YAxis
          type="category"
          dataKey="name"
          width={isTabletOrMobile ? 0 : 340}
          interval={0}
        />
        {/* interval on axis shows all categories */}
        {/* <Tooltip content={<CustomTooltip payload={customTooltipData} />} /> */}
        <Tooltip />
        {/* <CustomTooltip /> */}
        <Legend />
        <Bar dataKey={indicator} fill="#1DA57A" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
