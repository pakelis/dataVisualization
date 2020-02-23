import React, { useEffect, useState } from "react";

import axios from "axios";

import { Button } from "antd";

function App() {
  const [state, setState] = useState(null);

  useEffect(() => {
    axios
      .get("/api/hello")
      .then(res => setState(res.data))
      .catch(err => console.log(err));

    axios
      .get("/api/get/allusers")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []); // component did mount

  return (
    <div className="App">
      <Button type="primary">Antd Button</Button>
      {state}
    </div>
  );
}

export default App;
