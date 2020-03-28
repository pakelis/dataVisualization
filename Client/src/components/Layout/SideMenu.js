import React, { useState, useEffect } from "react";

//ant-d
import { Drawer } from "antd";

const SideMenu = ({ show }) => {
  console.log(show);
  const [visible, setVisible] = useState(show);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Drawer
      title="Drawer"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <p>Content</p>
    </Drawer>
  );
};

export default SideMenu;
