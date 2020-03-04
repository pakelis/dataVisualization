import React, { useState, useEffect } from "react";

import axios from "axios";

import { useAuth0 } from "../react-auth0-spa";
import { Typography, Table, Button } from "antd";

const { Title } = Typography;

const ShowUploadedData = parsedInfo => {
  const [rows, setRows] = useState(null);
  const [fields, setFields] = useState(null);
  const [showItems, setShowItems] = useState(10);
  const [columns, setColumns] = useState(null);
  const [loading, setLoading] = useState({
    loading: false
  });

  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    if (
      Object.entries(parsedInfo.data).length === 0 && // check if object is not empty
      parsedInfo.constructor === Object
    ) {
      console.log("data is empty");
    } else {
      const {
        data: {
          data,
          meta: { fields }
        }
      } = parsedInfo;

      setFields(fields);

      let addKey = data.map((row, index) => ({ ...row, key: index })); // We add key property to our data object for table

      //   setRows(addKey.slice(0, showItems)); // we slice our object to show only 10 first rows
      setRows(addKey);
      console.log(rows);
      console.log(fields);

      setColumns(
        fields.map((field, index) => ({
          title: field,
          dataIndex: field,
          key: field
        }))
      );
    }
  }, [parsedInfo]);

  const sendData = async () => {
    try {
      const token = await getTokenSilently();

      const data = {
        rows: rows,
        fields: fields
      };

      console.log(data);

      const res = await axios.post("/admin/api/upload", data, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <div>
      {rows != null ? (
        <div>
          <Title level={2}>CSV preview</Title>
          <Table dataSource={rows} columns={columns} />
          <Button onClick={sendData} type="primary" loading={loading.loading}>
            Submit data to DB
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ShowUploadedData;
