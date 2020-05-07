import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";

//views
import ExternalApi from "./views/ExternalApi";
import PostCsv from "./views/PostCsv";
import CreateChartView from "./views/CreateChart";

//layout
import NavBar from "./components/Layout/NavBar";

//extra libraries
import history from "./utils/history";

//context
import { SelectedTableProvider, CustomizationProvider } from "./context";

//antd imports
import { Layout } from "antd";

//css
import "./styles.css";

const { Content, Footer } = Layout;

function App() {
  return (
    <SelectedTableProvider>
      <CustomizationProvider>
        <div
          className="App"
          style={{ position: "relative", minHeight: "100vh" }}
        >
          <Router history={history}>
            <Layout>
              <NavBar />
              <Content>
                <Switch>
                  <Route path="/" exact />
                  <PrivateRoute path="/profile" component={Profile} />
                  <PrivateRoute path="/external-api" component={ExternalApi} />
                  <PrivateRoute path="/post-csv" component={PostCsv} />
                  <PrivateRoute
                    path="/create-chart"
                    component={CreateChartView}
                  />
                </Switch>
              </Content>
            </Layout>
            <Footer>Data Visualization ©2020 Created by Mantas</Footer>
          </Router>
        </div>
      </CustomizationProvider>
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
