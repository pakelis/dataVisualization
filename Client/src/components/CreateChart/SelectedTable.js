import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { useSelectedTableValue } from "../../context";

//libs
import axios from "axios";

//antd
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";

function handleButtonClick(e) {
  message.info("Click on left button.");
  console.log("click left button", e);
}

const SelectedTable = () => {
  const [tableNames, setTableNames] = useState([]);
  const { getTokenSilently } = useAuth0();
  //this comes from context
  const { setSelectedTable, selectedTable } = useSelectedTableValue();

  const getTableNames = async () => {
    const token = await getTokenSilently();

    let res = await axios
      .get("/admin/api/tablenames", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        let names = [];
        res.data.map(table => names.push(table.tablename));
        setTableNames(names);
      });
  };

  useEffect(() => {
    getTableNames();
  }, []);

  const handleMenuClick = e => {
    setSelectedTable(tableNames[e.key]); // e.key get index of dropdown
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {tableNames.map((name, index) => {
        return (
          <Menu.Item key={index}>
            <UserOutlined />
            {name}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu}>
        <Button>
          Tables <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default SelectedTable;
