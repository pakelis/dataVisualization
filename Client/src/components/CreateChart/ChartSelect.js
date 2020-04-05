import React from "react";

//ant
import { List, Card } from "antd";
import { BarChartOutlined, PieChartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const data = [
  {
    title: "Bar Chart",
    icon: (
      <BarChartOutlined
        rotate={-90}
        className="chart-icon"
        style={{ transform: "scaleX(-1)" }}
      />
    ),
  },
  {
    title: "Column Chart",
    icon: <BarChartOutlined className="chart-icon" />,
  },
  {
    title: "Pie Chart",
    icon: <PieChartOutlined className="chart-icon" />,
  },
];

const ChartSelect = () => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card hoverable cover={item.icon}>
            <Meta title={item.title} />
          </Card>
        </List.Item>
      )}
    ></List>
  );
};

export default ChartSelect;
