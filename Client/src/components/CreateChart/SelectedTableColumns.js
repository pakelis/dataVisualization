import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { useSelectedTableValue } from "../../context";

//libs
import axios from "axios";

//antd
import { List, Typography } from "antd";

const SelectedTableColumns = () => {
  const [data, setData] = useState();
  const [selectedTableColumns, setSelectedTableColumns] = useState();
  const { getTokenSilently } = useAuth0();
  const { selectedTable } = useSelectedTableValue();

  const getTableColums = async () => {
    const token = await getTokenSilently();

    let res = axios
      .get("/admin/api/tablecolumns", {
        params: {
          tableName: selectedTable
        },
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (selectedTable != null) {
      getTableColums();
    }
  }, [selectedTable]);

  return <div>Columns</div>;
};

export default SelectedTableColumns;
