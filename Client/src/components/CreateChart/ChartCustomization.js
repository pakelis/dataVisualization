import React, { useState } from "react";

//ant-d

import { Col, InputNumber, Form, Typography } from "antd";

const { Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ChartCustomization = () => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const [textSize, setTextSize] = useState(12);
  const [leftMargin, setLeftMargin] = useState(40);
  const [rightMargin, setRightMargin] = useState(40);

  const handleWidth = (value) => {
    setWidth(value);
  };
  const handleHeight = (value) => {
    setHeight(value);
  };
  const handleTextSize = (value) => {
    setTextSize(value);
  };
  const handleRightMargin = (value) => {
    setRightMargin(value);
  };
  const handleLeftMargin = (value) => {
    setLeftMargin(value);
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
        <Text className="customization-text">Width</Text>
        <InputNumber
          min={1}
          max={1800}
          defaultValue={600}
          onChange={handleWidth}
        />
        <Text className="customization-text">Height</Text>
        <InputNumber
          min={1}
          max={1800}
          defaultValue={600}
          onChange={handleHeight}
        />
        <Text className="customization-text">Text Size</Text>
        <InputNumber
          min={1}
          max={128}
          defaultValue={12}
          onChange={handleTextSize}
        />
        <Text className="customization-text">Left Margin</Text>
        <InputNumber
          min={1}
          max={1000}
          defaultValue={40}
          onChange={handleLeftMargin}
        />
        <Text className="customization-text">Right Margin</Text>
        <InputNumber
          min={1}
          max={1000}
          defaultValue={40}
          onChange={handleRightMargin}
        />
      </Form>
    </Col>
  );
};

export default ChartCustomization;
