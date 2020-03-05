import React, { useEffect, useState } from "react";

import axios from "axios";

import { useAuth0 } from "../react-auth0-spa";

import { Form, Input, Button } from "antd";

const FormSubmit = props => {
  const { getTokenSilently } = useAuth0();
  const { rows, fields } = props;

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
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

  const onSubmitFailed = errorInfo => {
    console.log("failed", errorInfo);
  };

  return <div>FORMA</div>;
};

export default FormSubmit;
