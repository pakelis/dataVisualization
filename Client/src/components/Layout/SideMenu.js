import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutModal from "./LogoutModal";

//ant-d
import { Drawer, Menu } from "antd";

const SideMenu = ({ showDrawer, handleDrawer, logout }) => {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <Drawer
      title="Data Visualization"
      placement="right"
      closable={false}
      onClose={handleDrawer}
      visible={showDrawer}
    >
      <Menu
        mode="inline"
        style={{ height: "100%", width: "100%", borderRight: 0 }}
      >
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
        <Menu.Item key="/logout" onClick={handleLogout}>
          <a> Log out</a>
        </Menu.Item>
      </Menu>
      <LogoutModal
        logout={logout}
        setShowLogout={setShowLogout}
        showLogout={showLogout}
      />
    </Drawer>
  );
};

export default SideMenu;
