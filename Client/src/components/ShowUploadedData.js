import React, { useState, useEffect } from "react";

import { Typography, Table, Button } from "antd";
import FormSubmit from "./FormSubmit";
import Demo from "./Demo";

const { Title } = Typography;

const ShowUploadedData = parsedInfo => {
  const [rows, setRows] = useState(null);
  const [fields, setFields] = useState(null);
  const [showItems, setShowItems] = useState(10);
  const [columns, setColumns] = useState(null);
  const [loading, setLoading] = useState({
    loading: false
  });

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

  return (
    <div>
      {rows != null ? (
        <div>
          <Title level={2}>CSV preview</Title>
          <Table dataSource={rows} columns={columns} />
          <FormSubmit rows={rows} fields={fields} />
          <Demo />
        </div>
      ) : null}
    </div>
  );
};

export default ShowUploadedData;
