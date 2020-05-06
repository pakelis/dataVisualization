import React from "react";
import CustomizationInput from "./CustomizationInput";

//ant-d
import { Col, InputNumber, Form, Typography } from "antd";

//context
import { useCustomizationValue } from "../../context";

const { Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ChartCustomization = () => {
  const {
    setWidth,
    setHeight,
    setLeftMargin,
    setRightMargin,
    setBottomMargin,
    setTopMargin,
  } = useCustomizationValue();

  const handleWidth = (value) => {
    setWidth(value);
  };
  const handleHeight = (value) => {
    setHeight(value);
  };
  const handleRightMargin = (value) => {
    setRightMargin(value);
  };
  const handleLeftMargin = (value) => {
    setLeftMargin(value);
  };
  const handleBottomMargin = (value) => {
    setBottomMargin(value);
  };
  const handleTopMargin = (value) => {
    setTopMargin(value);
  };

  return (
    <Col span={6}>
      <Form
        {...layout}
        name="customization"
        initialValues={{ remember: true }}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CustomizationInput
          text={"Width"}
          min={400}
          max={1800}
          defaultValue={600}
          onChange={handleWidth}
          step={10}
        />
        <CustomizationInput
          text={"Height"}
          min={400}
          max={1800}
          defaultValue={1200}
          onChange={handleHeight}
          step={10}
        />
        <CustomizationInput
          text={"Left Margin"}
          min={5}
          max={1000}
          defaultValue={5}
          onChange={handleLeftMargin}
        />
        <CustomizationInput
          text={"Right Margin"}
          min={5}
          max={1000}
          defaultValue={5}
          onChange={handleRightMargin}
        />
        <CustomizationInput
          text={"Bottom Margin"}
          min={5}
          max={1000}
          defaultValue={5}
          onChange={handleBottomMargin}
        />
        <CustomizationInput
          text={"Top Margin"}
          min={5}
          max={1000}
          defaultValue={5}
          onChange={handleTopMargin}
        />
      </Form>
    </Col>
  );
};

export default ChartCustomization;
