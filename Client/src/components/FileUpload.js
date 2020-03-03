import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";

import { useAuth0 } from "../react-auth0-spa";

import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const handleForce = (data, fileName) => console.log(data, fileName);

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

const FileUpload = () => {
  const { getTokenSilently } = useAuth0();

  const [file, setFile] = useState({
    selectedFile: null,
    selectedFileList: [],
    selectedFileName: ""
  });

  const getToken = async () => {
    const token = await getTokenSilently();

    // return (props.headers.authorization = `Bearer ${token}`);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = await getTokenSilently();

      const res = await axios.post("/admin/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer + ${token}`
        }
      });

      const { fileName } = res.data;

      setFile({ ...file, selectedFileName: fileName });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const beforeUpload = file => {
    const isType = file.type === "application/vnd.ms-excel";
    // const isCSV = file.name.split(".")[1].toUpperCase() === "CSV" ? true : false;

    if (!isType) {
      message.error("You can only upload .csv files");
      return false;
    }

    const reader = new FileReader();

    reader.onload = e => {
      const lines = reader.result.split("\n");
      lines.map(line => {
        line.split(",");
      });
      console.log(lines);
    };
    reader.readAsText(file);
  };

  const onChange = info => {
    const nextState = {};
    switch (info.file.status) {
      case "uploading":
        nextState.selectedFileList = [info.file];
        break;
      case "done":
        nextState.selectedFile = info.file;
        nextState.selectedFileList = [info.file];
        nextState.selectedFileName = [info.file.name];
        break;

      default:
        // error or removed
        nextState.selectedFile = null;
        nextState.selectedFileList = [];
    }
    setFile(nextState);
  };

  return (
    <div>
      <Upload
        fileList={file.selectedFileList}
        customRequest={dummyRequest}
        onChange={onChange}
        beforeUpload={beforeUpload}
      >
        <Button>
          <UploadOutlined /> Choose file
        </Button>
      </Upload>
    </div>
  );
};

// export default Form.create()(FileUpload);
export default FileUpload;
