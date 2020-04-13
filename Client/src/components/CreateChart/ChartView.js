import React from "react";
import ChartCustomization from "./ChartCustomization";
import ChartPreview from "./ChartPreview";

//ant-d
import { Typography, Row } from "antd";
const { Text } = Typography;

const ChartView = ({
  multiIndicator,
  indicator,
  chartNameField,
  chartType,
  tableColumns,
}) => {
  console.log(`indicator - ${indicator}, chartNameField - ${chartNameField}`);
  console.log(
    `multiIndicator - ${multiIndicator}, chartNameField - ${chartNameField}`
  );

  return (
    <>
      {tableColumns.includes(
        // if indicator and name field selected or multiindicator with name field
        (indicator && chartNameField) || (multiIndicator && chartNameField)
      ) ? (
        <>
          <div className="section__text">
            <Text strong>Customize your Visualization</Text>
          </div>
          <Row>
            <ChartCustomization />
            <ChartPreview
              multiIndicator={multiIndicator}
              indicator={indicator}
              chartNameField={chartNameField}
              chartType={chartType}
              tableColumns={tableColumns}
            />
          </Row>
        </>
      ) : (
        console.log("DOESNT INCLUDE")
      )}
    </>
  );
};

export default ChartView;
