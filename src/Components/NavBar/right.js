import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const RightMenu = ({}) => {
  if(true){
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <Link to="/register">Sign Up</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/">Sign In</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu
