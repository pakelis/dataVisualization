import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const { getTokenSilently } = useAuth0();

  const [state, setState] = useState(null);
  const [stateMessage, setStateMessage] = useState("");
  const [result, setResult] = useState(false);
  const [axiosCall, setAxiosCall] = useState();

  const callApi = async () => {
    try {
      const token = await getTokenSilently();

      const response = await fetch("/admin/api/external", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const callExHello = async () => {
    try {
      const token = await getTokenSilently();

      const helloEx = await fetch("/admin/api/externalhello", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const helloExData = await helloEx.json();

      setResult(true);
      setStateMessage(helloExData);
    } catch (error) {
      console.error(error);
    }
  };

  const callAxios = async () => {
    const token = await getTokenSilently();

    let res = await axios
      .get("/admin/api/externalhello", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => console.log(res.data));
  };

  const callHello = async () => {
    try {
      const hello = await fetch("/api/hello");

      const helloData = await hello.json();

      setState(helloData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>External API</h1>
      <button onClick={callApi}>Ping API</button>
      {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
      <button onClick={callHello}>Get hello</button>
      <button onClick={callExHello}>Get external hello</button>
      <button onClick={callAxios}>Call axios external hello</button>
      {axiosCall}
      {result && <code>{JSON.stringify(stateMessage, null, 2)}</code>}
      {state}
    </>
  );
};

export default ExternalApi;
