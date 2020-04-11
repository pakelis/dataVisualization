import React from "react";
import ChartCustomization from "./ChartCustomization";
import ChartPreview from "./ChartPreview";

//ant-d
import { Typography, Row } from "antd";
const { Text } = Typography;

const ChartView = ({ indicator, chartNameField, chartType, tableColumns }) => {
  return (
    <>
      {tableColumns.includes(indicator && chartNameField) ? (
        <>
          <div className="section__text">
            <Text strong>Customize your Visualization</Text>
          </div>
          <Row>
            <ChartCustomization />
            <ChartPreview
              indicator={indicator}
              chartNameField={chartNameField}
              chartType={chartType}
              tableColumns={tableColumns}
            />
          </Row>
        </>
      ) : null}
    </>
  );
};

export default ChartView;
