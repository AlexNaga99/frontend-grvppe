import React from "react";
import { Layout, Menu } from 'antd';
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
        <Sider>
          <div className="logo" />
          <p style={{ color: "white", fontFamily: 'Montserrat', fontSize: '25px', textAlign: 'center', marginTop: '1rem' }}>Convertme</p>
          <Menu theme="dark" mode="inline">
            <SubMenu key="sub1" title="Converter">
              <Menu.Item key="1"><Link to="convert-image">Imagem</Link></Menu.Item>
              <Menu.Item key="2"><Link to="convert-videos">Video</Link></Menu.Item>
              <Menu.Item key="3"><Link to="convert-documents">Documento</Link></Menu.Item>
              <Menu.Item key="4"><Link to="currencies">Moeda</Link></Menu.Item>
              <Menu.Item key="5"><Link to="distance">Distância</Link></Menu.Item>
              <Menu.Item key="6"><Link to="temperature">Temperatura</Link></Menu.Item>
              <Menu.Item key="7"><Link to="weight">Peso</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Formatar">
              <Menu.Item key="8">Texto</Menu.Item>
              <Menu.Item key="9">ABNT</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title="Matemática">
              <Menu.Item key="10">Função 1º</Menu.Item>
              <Menu.Item key="11">Função 2º</Menu.Item>
              <Menu.Item key="12">Notação</Menu.Item>
              <Menu.Item key="13">Raiz Quadrada</Menu.Item>
            </SubMenu>
            <Menu.Item key="14">ICM</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Component/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>copyright reserved ©2021 Created by WorkTools</Footer>
        </Layout>
      </Layout>
    )} />
  )
}

export default AppLayout;