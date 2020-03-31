import React, { useEffect } from "react";

//ant-d
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const LogoutModal = ({ logout, showLogout, setShowLogout }) => {
  useEffect(() => {
    showLogout && showConfirm();
  }, [showLogout]);

  const showConfirm = () => {
    confirm({
      title: "Are you sure you want to logout?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        logout();
      },
      onCancel() {
        setShowLogout(false);
      }
    });
  };

  return <></>;
};

export default LogoutModal;
