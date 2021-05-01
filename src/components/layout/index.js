import React from "react";
import { Layout } from 'antd';
import { Route } from "react-router-dom";
import './style.css';

const { Header, Content } = Layout;

const AppLayout = ({ component: Component, ...rest }) => {

  return (
    <Route path="/" {...rest} render={matchProps => (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="d-flex justify-content-start align-items-center" id="result-pagination">
            <p style={{ color: "white", fontFamily: 'Montserrat', fontSize: '25px', textAlign: 'left', margin: 'unset' }}>GRVPPE</p>
          </div>
        </Header>
        <Layout>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ paddingTop: '24px', minHeight: '360px', height: '100%' }}>
                <Component/>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )} />
  )
}

export default AppLayout;