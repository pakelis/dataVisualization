import React, { useState, useEffect } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import { useAuth0 } from "../../react-auth0-spa";
import axios from "axios";

function handleButtonClick(e) {
  message.info("Click on left button.");
  console.log("click left button", e);
}

function handleMenuClick(e) {
  message.info("Click on menu item.");
  console.log("click", e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">
      <UserOutlined />
      1st menu item
    </Menu.Item>
    <Menu.Item key="2">
      <UserOutlined />
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3">
      <UserOutlined />
      3rd item
    </Menu.Item>
  </Menu>
);

const SelectedTable = () => {
  const [tableNames, setTableNames] = useState();
  const { getTokenSilently } = useAuth0();

  const getTableNames = async () => {
    const token = await getTokenSilently();

    let res = await axios
      .get("/admin/api/tablenames", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setTableNames(res.data));
  };

  useEffect(() => {
    getTableNames;
  });

  return (
    <div>
      <Dropdown overlay={menu}>
        <Button>
          Button <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default SelectedTable;
