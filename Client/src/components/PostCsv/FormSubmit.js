import React, { useEffect, useState } from "react";

import axios from "axios";

import { useAuth0 } from "../../react-auth0-spa";

import { Form, Input, Button, Typography, Checkbox, message } from "antd";

const layout = {
  // layout properties for our form
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const FormSubmit = (props) => {
  const [form] = Form.useForm();
  const { getTokenSilently } = useAuth0();
  const { rows, fields, fileName } = props;

  const [checked, setChecked] = useState(false);

  const parseFileName = (filename) => {
    let name = fileName[0];
    let index = name.indexOf(".");
    let newName = name.substring(0, index);

    return newName;
  };

  useEffect(() => {
    if (fileName === undefined) {
      console.log("undefined fileName");
    } else {
      checked
        ? form.setFieldsValue({ name: parseFileName(fileName) })
        : form.setFieldsValue({ name: "" });
    }
  });

  const onCheckboxChange = (e) => {
    setChecked(e.target.checked);

    if (!checked) {
      form.setFieldsValue({ name: parseFileName(fileName) });
    } else {
      form.setFieldsValue({ name: "" });
    }
  };

  const onSubmit = async (values) => {
    try {
      const token = await getTokenSilently();

      const newRows = rows.map(({ key, ...row }) => row); // we delete key property from array with deconstruction

      const data = {
        rows: newRows,
        fields: fields.map((string) => string.replace(/\s+/g, "_")), // adding underscores instead of spaces
        tableName: values.name.replace(/\s+/g, "_"),
      };

      const res = await axios
        .post("/admin/api/upload", data, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) =>
          res.data.hasOwnProperty("success")
            ? message.success(res.data.success)
            : message.error(res.data.error)
        );
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitFailed = (errorInfo) => {
    console.log("failed", errorInfo);
  };

  const onValueChanged = () => {
    setChecked(false);
  };

  return (
    <Form
      form={form} // we use useForm hook from antd to use this forms values ant all other methods!
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmit}
      onFinishFailed={onSubmitFailed}
      // onValuesChange={onValueChanged}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input Table name for DB",
          },
        ]}
      >
        <Input placeholder="Table name" size="large" />
      </Form.Item>

      <Form.Item checked={checked} onChange={onCheckboxChange}>
        <Checkbox>Make table name same as file name</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", height: "40px" }}
          // disabled={form.getFieldValue("name") ? false : true}
        >
          Submit table
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormSubmit;
