import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";

import { useAuth0 } from "../react-auth0-spa";

import { Form, Upload, Button, Icon } from "antd";

const FileUpload = props => {
  const { getTokenSilently } = useAuth0();

  const { getFieldDecorator } = props.form;

  const [upload, setUpload] = useState();

  const uploadCall = async () => {
    const token = await getTokenSilently();

    const respone = await axios
      .get("/admin/api/upload", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => console.log(res.data));
  };

  const normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Fragment>
      <Form>
        <Form.Item>
          {getFieldDecorator("upload", {
            valuePropName: "fileList",
            getValueFromEvent: normFile
          })(
            <Upload name="logo" action={uploadCall} listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item>
        <button onClick={uploadCall}>Upload Call</button>
      </Form>
    </Fragment>
  );
};

export default Form.create()(FileUpload);
