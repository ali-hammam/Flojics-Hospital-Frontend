import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { remove } from "../../Libraries/Storage";

const RightUser = () => {
    const onLogOut = (e) => {
      e.preventDefault();
      remove('jwt');
      document.location.reload();
    }

    return (
      <>
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <a onClick={(e) => onLogOut(e)}>Log Out</a>
        </Menu.Item>
      </Menu>
      </>
    );
}

export default RightUser;
