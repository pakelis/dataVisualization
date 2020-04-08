import React, { useState, useEffect } from "react";
import CustomTooltip from "./CustomTooltip";
import { useAuth0 } from "../../react-auth0-spa";

//ant-d
import { Col, Row } from "antd";

//react-responsive
import { useMediaQuery } from "react-responsive";

//recharts
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

//libs
import axios from "axios";

//context
import { useSelectedTableValue } from "../../context";

const ChartPreview = ({
  indicator,
  chartNameField,
  chartType,
  tableColumns,
}) => {
  const { selectedTable } = useSelectedTableValue();
  const { getTokenSilently } = useAuth0();
  const [responseData, setResponseData] = useState();
  const [chartData, setChartData] = useState();
  const [dataMax, setDataMax] = useState();
  const [customTooltipData, setCustomTooltipData] = useState();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });

  useEffect(() => {
    getData();
  }, [selectedTable, chartNameField, indicator, chartType]);

  const getData = async () => {
    const token = await getTokenSilently();

    let res = await axios
      .get("/admin/api/selectedtable", {
        params: {
          tableName: selectedTable,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setResponseData(res.data);

        let chart = res.data.map((val) => {
          return {
            name: val[chartNameField],
            [indicator]: val[indicator],
            year: val.Metai,
          };
        });

        setCustomTooltipData(res.data.map((val) => val.Metai));

        setDataMax(Math.max(...res.data.map((val) => val[indicator])) + 100);

        setChartData(chart);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Col span={16}>
      {chartType === "barChart" ? (
        <ResponsiveContainer width="95%" height={1800}>
          <BarChart
            width={850}
            height={1800}
            data={chartData}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={true} />
            <XAxis type="number" domain={[0, dataMax]} />
            <YAxis
              type="category"
              dataKey="name"
              width={isTabletOrMobile ? 0 : 340}
              interval={0}
            />
            {/* interval on axis shows all categories */}
            <Tooltip content={<CustomTooltip payload={customTooltipData} />} />
            {/* <CustomTooltip /> */}
            <Legend />
            <Bar dataKey={indicator} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </Col>
  );
};

export default ChartPreview;
