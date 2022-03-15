import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LeftMenu = () => {
  return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="alipay">
          <Link to="/doctors">Doctors</Link>
        </Menu.Item>
      </Menu>
    );
}

export default LeftMenu

