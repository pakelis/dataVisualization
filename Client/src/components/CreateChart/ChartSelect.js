import React, { useState } from "react";
import { useSelectedTableValue } from "../../context";

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

const ChartSelect = () => {
  const [activeCard, setActiveCard] = useState();
  const { selectedTable } = useSelectedTableValue();

  const handleActive = (name) => {
    setActiveCard(name);
  };

  return (
    <>
      {selectedTable != null ? (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 8,
          }}
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <Card
                hoverable
                cover={item.icon}
                onClick={() => handleActive(item.cardName)}
                className={activeCard === item.cardName ? "cardActive" : null}
              >
                <Meta title={item.title} style={{ textAlign: "center" }} />
              </Card>
            </List.Item>
          )}
        ></List>
      ) : null}
    </>
  );
};

export default ChartSelect;
