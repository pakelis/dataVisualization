import React from "react";

import { InputNumber, Typography } from "antd";

const { Text } = Typography;

const CustomizationInput = ({
  text,
  min = 1,
  max = 2000,
  defaultValue = 1,
  onChange,
  step = 1,
}) => {
  return (
    <>
      <Text className="customization-text">{text}</Text>
      <InputNumber
        min={min}
        max={max}
        defaultValue={defaultValue}
        onChange={onChange}
        step={step}
      />
    </>
  );
};

export default CustomizationInput;
