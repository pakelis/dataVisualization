import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";

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
  ResponsiveContainer
} from "recharts";

//libs
import axios from "axios";

//context
import { useSelectedTableValue } from "../../context";

const ChartPreview = ({
  indicator,
  chartNameField,
  chartType,
  tableColumns
}) => {
  const { selectedTable } = useSelectedTableValue();
  const { getTokenSilently } = useAuth0();
  const [responseData, setResponseData] = useState();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    getData();
  }, [selectedTable]);

  const getData = async () => {
    const token = await getTokenSilently();

    let res = await axios
      .get("/admin/api/selectedtable", {
        params: {
          tableName: selectedTable
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setResponseData(res.data);
        console.log(res.data);

        let chart = res.data.map(val => {
          return {
            name: val[chartNameField],
            [indicator]: val[indicator]
          };
        });

        let dataMax = res.data.reduce((prev, current) => {
          return prev[indicator] < current[indicator]
            ? prev[indicator]
            : current[indicator];
        });

        console.log(dataMax);
        console.log(indicator);

        setChartData(chart);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      {chartType === "barChart" ? (
        <ResponsiveContainer width="95%" height={1400}>
          <BarChart
            width={850}
            height={1800}
            data={chartData}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={true} />
            <XAxis type="number" domain={[0, 5000]} />
            <YAxis type="category" dataKey="name" width={440} interval={0} />
            {/* interval on axis shows all categories */}
            <Tooltip />
            <Legend />
            <Bar dataKey={indicator} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
};

export default ChartPreview;
