import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";

//libs
import axios from "axios";

//context
import { useSelectedTableValue } from "../../context";

const ChartPreview = ({ indicator, order, chartType, tableNames }) => {
  const { selectedTable } = useSelectedTableValue();
  const { getTokenSilently } = useAuth0();

  const getData = async () => {
    const token = await getTokenSilently();

    let res = await axios
      .get("/admin/api/selectedtable", {
        params: {
          tableName: selectedTable
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  return <div>Chart preview</div>;
};

export default ChartPreview;
