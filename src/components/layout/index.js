import React, { useState } from "react";
import { Layout, Menu } from 'antd';
import { Link, Route } from "react-router-dom";
import './style.css';
import { SyncOutlined, DashboardOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AppLayout = ({ component: Component, ...rest }) => {

  const [collapsed, setCollapsed] = useState();

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  
  return (
    <Route path="/" {...rest} render={matchProps => (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          {/* <div className="logo" /> */}
          {/* <img src=""></img> */}
          <div className="d-flex justify-content-start align-items-center">
            <a href="http://localhost:3000/"><img src="../../logo-convertme.png" alt="logo-convertme" width="50px" height="50px"/></a>
            <a href="http://localhost:3000/" className="logo-icon"><p style={{ color: "white", fontFamily: 'Montserrat', fontSize: '25px', textAlign: 'left', margin: 'unset' }}>Convertme</p></a>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background" collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
             <SubMenu key="sub1" icon={<SyncOutlined />} title="Converter">
              <Menu.Item key="1"><Link to="minify-js">Minificação js</Link></Menu.Item>
              <Menu.Item key="2"><Link to="minify-css">Minificação css</Link></Menu.Item>
              <Menu.Item key="3"><Link to="json-formatter">Formatação Json</Link></Menu.Item>
              <Menu.Item key="4"><Link to="currencies">Moeda</Link></Menu.Item>
              <Menu.Item key="5"><Link to="distance">Distância</Link></Menu.Item>
              <Menu.Item key="6"><Link to="temperature">Temperatura</Link></Menu.Item>
              <Menu.Item key="7"><Link to="weight">Peso</Link></Menu.Item>
             </SubMenu>
             {/* <SubMenu key="sub2" title="Matemática">
               <Menu.Item key="8">Função 1º</Menu.Item>
               <Menu.Item key="9">Função 2º</Menu.Item>
               <Menu.Item key="10">Notação</Menu.Item>
               <Menu.Item key="11">Raiz Quadrada</Menu.Item>
             </SubMenu> */}
             <Menu.Item key="12" icon={<DashboardOutlined />}>IMC</Menu.Item>
           </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                { collapsed ? <Component/> : <div className="blur"><Component/></div> }
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Copyright reservado ©2021 criado por Convertme</Footer>
          </Layout>
        </Layout>
      </Layout>
    )} />
  )
}

export default AppLayout;