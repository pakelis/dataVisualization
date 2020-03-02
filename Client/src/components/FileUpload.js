import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";

import { useAuth0 } from "../react-auth0-spa";

import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FileUpload = () => {
  const { getTokenSilently } = useAuth0();

  const [upload, setUpload] = useState();

  const uploadCall = async () => {
    const token = await getTokenSilently();

    const res = await axios
      .post(
        "/admin/api/upload",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => console.log(res.data));
  };

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text"
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <div>
      <Upload {...props}>
        <Button>
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload>
    </div>
  );
};

// export default Form.create()(FileUpload);
export default FileUpload;
