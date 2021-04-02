import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link, Route } from "react-router-dom";
import './style.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AppLayout = ({ component: Component, ...rest }) => {

  // const onSelect = ({ key, history }) => {
  //   history.push(key);
  // }

  return (
    <Route path="/" {...rest} render={matchProps => (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <p style={{ color: "white", fontFamily: 'Montserrat', fontSize: '25px', textAlign: 'left' }}>Convertme</p>
          <div className="logo" />
          <img src="../../assets/logo-convertme.png" alt="logo-convertme"/>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
          <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
             <SubMenu key="sub1" title="Converter">
               <Menu.Item key="1"><Link to="minify-js">Minificação js</Link></Menu.Item>
               <Menu.Item key="2"><Link to="minify-css">Minificação css</Link></Menu.Item>
               <Menu.Item key="3"><Link to="json-formatter">Formatação Json</Link></Menu.Item>
               <Menu.Item key="4"><Link to="currencies">Moeda</Link></Menu.Item>
               <Menu.Item key="5"><Link to="distance">Distância</Link></Menu.Item>
               <Menu.Item key="6"><Link to="temperature">Temperatura</Link></Menu.Item>
               <Menu.Item key="7"><Link to="weight">Peso</Link></Menu.Item>
             </SubMenu>
             <SubMenu key="sub2" title="Matemática">
               <Menu.Item key="8">Função 1º</Menu.Item>
               <Menu.Item key="9">Função 2º</Menu.Item>
               <Menu.Item key="10">Notação</Menu.Item>
               <Menu.Item key="11">Raiz Quadrada</Menu.Item>
             </SubMenu>
             <Menu.Item key="12">IMC</Menu.Item>
           </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Component/>
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