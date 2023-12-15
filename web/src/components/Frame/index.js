import React from 'react';

import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined,FileTextOutlined } from '@ant-design/icons';

import { adminRoutes } from '../../routes';
import { withRouter } from 'react-router-dom';
// import fetch from '../../global/http';

const { Header, Content, Footer, Sider } = Layout;

function Index(props) {
  const info = JSON.parse(sessionStorage.getItem('userInfo'));
  if (!info) {
    props.history.push('/login');
    return (<div></div>)
     
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <h1 style={{ color: '#fff', paddingLeft:'28px',  paddingTop: '20px', }}>
          技术面试系统
        </h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/admin/home']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {adminRoutes.map((route) => {
            return (
              <Menu.Item
                key={route.path}
                {...route}
                onClick={(p) => props.history.push(p.key)}
              >
               {/* <FileTextOutlined />  */}
               {route.title}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            paddingRight: '20px',
            textAlign: 'right',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px #f0f1f2',
          }}
        >
          <Avatar icon={<UserOutlined />} />{' '}
          <span className="username">
            {info.username} {info.role}
          </span>
        </Header>
        <Content style={{ margin: '16px' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default withRouter(Index);
