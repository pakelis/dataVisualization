import React, { useState, useEffect } from "react";
import { useSelectedTableValue } from "../../context";

//ant
import { List, Card, Typography } from "antd";
import { BarChartOutlined, PieChartOutlined } from "@ant-design/icons";

const { Title } = Typography;

const { Meta } = Card;

const data = [
  {
    title: "Bar Chart",
    icon: (
      <BarChartOutlined
        rotate={-90}
        className="chart-icon"
        style={{ transform: "scaleX(-1)" }}
        //Flipping image with transform: "scaleX(-1)"
      />
    ),
    cardName: "barChart",
  },
  {
    title: "Column Chart",
    icon: <BarChartOutlined className="chart-icon" />,
    cardName: "columnChart",
  },
  {
    title: "Pie Chart",
    icon: <PieChartOutlined className="chart-icon" />,
    cardName: "pieChart",
  },
];

const ChartSelect = ({ handleChartType, chartType }) => {
  const { selectedTable, setSelectedTable } = useSelectedTableValue();

  useEffect(() => {
    //we set SelectedTable to null when component unmounts
    return () => setSelectedTable(null);
  }, []);

  return (
    <>
      {selectedTable != null ? (
        <div className="chart-wrapper">
          <div className="text-wrapper">
            <Title level={4} strong className="section__text">
              Select chart
            </Title>
          </div>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <Card
                  hoverable
                  cover={item.icon}
                  onClick={() => handleChartType(item.cardName)}
                  className={chartType === item.cardName ? "cardActive" : null}
                >
                  <Meta title={item.title} style={{ textAlign: "center" }} />
                </Card>
              </List.Item>
            )}
          ></List>
        </div>
      ) : null}
    </>
  );
};

export default ChartSelect;
