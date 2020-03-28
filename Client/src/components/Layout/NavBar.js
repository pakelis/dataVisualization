import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Link, NavLink } from "react-router-dom";

//context
import { useDrawerValue } from "../../context";

//font
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram, faCoffee } from "@fortawesome/free-solid-svg-icons";

// ant-d
import { Layout, Menu, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

//css
import "../../../src/styles.css";

//react-responsive
import { useMediaQuery } from "react-responsive";

const { Header, Content, Footer } = Layout;

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const { drawerVisible, setDrawerVisible } = useDrawerValue();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo">
        <Link to="/">
          <FontAwesomeIcon
            icon={faProjectDiagram}
            style={{ fontSize: "16px", alignItems: "center" }}
          />
        </Link>
      </div>
      {!isAuthenticated && (
        <Menu mode="horizontal">
          <Menu.Item>
            <a onClick={() => loginWithRedirect({})}>Login</a>
          </Menu.Item>
        </Menu>
      )}

      {isAuthenticated && (
        <>
          {isTabletOrMobile && (
            <Menu mode="horizontal" style={{ display: "flex" }}>
              <Menu.Item key="home">
                <NavLink to="/">Home</NavLink>
              </Menu.Item>
              <Menu.Item>
                <MenuOutlined onClick={showDrawer} />
              </Menu.Item>
            </Menu>
          )}
          {isBigScreen && (
            <Menu mode="horizontal" style={{ display: "flex" }}>
              <Menu.Item key="home">
                <NavLink to="/">Home</NavLink>
              </Menu.Item>
              <Menu.Item key="/profile">
                <NavLink to="/profile">Profile</NavLink>
              </Menu.Item>
              <Menu.Item key="/external-api">
                <NavLink to="/external-api">External API</NavLink>
              </Menu.Item>
              <Menu.Item key="/post-csv">
                <NavLink to="/post-csv">Post CVS</NavLink>
              </Menu.Item>
              <Menu.Item key="/create-chart">
                <NavLink to="/create-chart">Create Chart</NavLink>
              </Menu.Item>
              <Menu.Item key="/logout">
                <a onClick={() => logout()}>Log out</a>
              </Menu.Item>
            </Menu>
          )}
        </>
      )}
    </Header>
  );
};

export default NavBar;
