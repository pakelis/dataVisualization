import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import ExternalApi from "./views/ExternalApi";
import PostCsv from "./views/PostCsv";
import CreateChartView from "./views/CreateCart";
import { useAuth0 } from "./react-auth0-spa";

//extra libraries
import history from "./utils/history";
import axios from "axios";

//context
import { SelectedTableProvider } from "./context";

//antd imports
import { Button } from "antd";

function App() {
  return (
    <SelectedTableProvider>
      <div className="App">
        <Router history={history}>
          <header>
            <NavBar />
          </header>
          <Switch>
            <Route path="/" exact />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/external-api" component={ExternalApi} />
            <PrivateRoute path="/post-csv" component={PostCsv} />
            <PrivateRoute path="/create-chart" component={CreateChartView} />
          </Switch>
        </Router>
      </div>
    </SelectedTableProvider>
  );
}

export default App;

/* TEST AXIOS
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
  */
