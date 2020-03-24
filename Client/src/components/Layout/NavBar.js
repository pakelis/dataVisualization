import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from "react-router-dom";

// ant-d
import { Layout, Menu, Button } from "antd";

const { Header, Content, Footer } = Layout;

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      {!isAuthenticated && (
        <Menu mode="horizontal" theme="dark">
          <Menu.Item>
            <Button onClick={() => loginWithRedirect}>Login</Button>
          </Menu.Item>
        </Menu>
      )}

      {isAuthenticated && (
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            {/* <Link to="/">Home</Link>&nbsp; */}
            Home
          </Menu.Item>
          <Menu.Item key="/profile">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="/external-api">
            <Link to="/external-api">External API</Link>
          </Menu.Item>
          <Menu.Item key="/post-csv">
            <Link to="/post-csv">Post CVS</Link>
          </Menu.Item>
          <Menu.Item key="/create-chart">
            <Link to="/create-chart">Create Chart</Link>
          </Menu.Item>
          <Menu.Item key="/logout">
            <Button onClick={() => logout}>Log out</Button>
          </Menu.Item>
        </Menu>
      )}
    </Header>
  );
};

export default NavBar;
