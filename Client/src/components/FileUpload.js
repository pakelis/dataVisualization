import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";
import Papa from "papaparse";

import { useAuth0 } from "../react-auth0-spa";

import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ShowUploadedData from "./ShowUploadedData";

const FileUpload = () => {
  const { getTokenSilently } = useAuth0();

  const [file, setFile] = useState({
    selectedFile: null,
    selectedFileList: [],
    selectedFileName: ""
  });
  const [dataRows, setDataRows] = useState({});
  const [columns, setColumns] = useState();

  const getToken = async () => {
    const token = await getTokenSilently();

    // return (props.headers.authorization = `Bearer ${token}`);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  useEffect(() => {
    getToken();
  }, []);

  const parser = file => {
    let rows = {};
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: results => {
        rows.data = results.data;
        rows.errors = results.errors;
        rows.meta = results.meta;
        rows.columns = Object.keys(results.data[0]).length;
      }
    });

    return rows;
  };

  const beforeUpload = file => {
    const isType = file.type === "application/vnd.ms-excel";

    if (!isType) {
      message.error("You can only upload .csv files");
      return false;
    }

    const data = parser(file);

    setDataRows(data);
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
      <ShowUploadedData data={dataRows} fileName={file.selectedFileName} />
    </div>
  );
};

// export default Form.create()(FileUpload);
export default FileUpload;
