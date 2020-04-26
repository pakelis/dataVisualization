import React from "react";

//ant-d

import { Col, InputNumber, Form } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const onChange = (value) => {
  console.log(value);
};

const ChartCustomization = () => {
  return (
    <Col span={8}>
      <Form {...layout} name="customization" initialValues={{ remember: true }}>
        {/* change form item to div so defaultValue would work   */}
        <Form.Item label="Width" name="width">
          <InputNumber
            min={1}
            max={1800}
            defaultValue={60}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item label="Height" name="height">
          <InputNumber
            min={1}
            max={1800}
            defaultValue={600}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item label="Left margin" name="leftMargin">
          <InputNumber
            min={1}
            max={1800}
            defaultValue={600}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item label="Right margin" name="rightMargin">
          <InputNumber
            min={1}
            max={1800}
            defaultValue={600}
            onChange={onChange}
          />
        </Form.Item>
      </Form>
    </Col>
  );
};

export default ChartCustomization;
