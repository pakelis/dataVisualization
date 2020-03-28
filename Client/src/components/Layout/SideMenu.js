import React, { useState, useEffect } from "react";

//ant-d
import { Drawer } from "antd";

//context
import { useDrawerValue } from "../../context";

const SideMenu = () => {
  const { drawerVisible, setDrawerVisible } = useDrawerValue();

  return (
    <Drawer
      title="Drawer"
      placement="right"
      closable={false}
      //   onClose={onClose}
      visible={drawerVisible}
      getContainer={false}
      style={{ position: "absolute" }}
    >
      <p>Content</p>
    </Drawer>
  );
};

export default SideMenu;
