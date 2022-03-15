import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { remove } from "../../Libraries/Storage";

const RightAdmin = () => {
  const onLogOut = (e) => {
    e.preventDefault();
    remove('jwt');
    document.location.reload();
  }

  return (
    <Menu mode="horizontal">
      <Menu.Item key="mail">
        <Link to="/hospital">Medical Center</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <a onClick={(e) => onLogOut(e)}>Log Out</a>
      </Menu.Item>
    </Menu>
  );
}

export default RightAdmin
