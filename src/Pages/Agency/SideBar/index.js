import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import './sidebar.css';
import { Link } from 'react-router-dom';

const SideBar = ({setIsDoctor}) => {
  const { Sider } = Layout;
  const { SubMenu } = Menu;

  return (
    <Sider 
      className='sider-color side-bar'
      collapsible 
      onCollapse={true}
      breakpoint="md"
      width={300}
    >
      <div className="logo" />
      <Menu className="sider-color sider-text-color menu-items" defaultSelectedKeys={['0']} >
        <Menu.Item key="1" icon={<HomeFilled width="20" height="20"/>} >
          <span style={{fontWeight:'450'}}>Medical Center</span>
        </Menu.Item>

      <Menu.Item key="2">
        <Button 
          className="user-menu-item menu-items" 
          type="text"
          onClick={() => setIsDoctor(true)}
          style={{width:'100%', textAlign:'start'}}>
          <span>Manage Doctors</span>
        </Button>
      </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideBar
