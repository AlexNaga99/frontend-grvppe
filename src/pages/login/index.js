
import React, { useState } from "react";
import 'antd/dist/antd.css';
import './style.css';
import { Row, Col, Card, Spin, Input, Button, message } from 'antd';
import { user_service } from '../../services/users';
import { useCookies } from 'react-cookie';
import { Redirect } from "react-router";

const Login = () => {

  const [ loading, setLoading ] = useState(false);
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ cookie, setCookie] = useCookies(['Id']);

  const handleLogin = async () => {
    setLoading(true);
    if(onValidade()){
      let body = {
        name: login,
        password: password,
      }
      let response_login = await user_service.login(body);
      let data = response_login.data[0].erro;
      if(!data){
        let id = response_login.data[0].data;
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+1);
        setCookie('Id', id, { path: '/', expires: tomorrow });
      }
      else {
        message.error("Erro: " + data);
      }
    }
    setLoading(false);
  };

  const onValidade = async () => {
    if(!login){
      message.info("Preencha corretamente o campo usuário.");
      return false
    }
    if(!password){
      message.info("Preencha corretamente o campo senha.");
      return false
    }
    return true
  }

  const onChangeLogin = value => {
    setLogin(value.target.value);
  }

  const onChangePassword = value => {
    setPassword(value.target.value);
  }

  return (
    !cookie.Id ? 
    <Spin spinning={loading}>
      <Row type="flex" justify="space-around" align="middle" className="login">
        <Col span={6}>
          <Card bordered={false} title="MovieBD">
            <Input placeholder="Usuário" onChange={e => onChangeLogin(e)} style={{ marginTop: '15px' }}/>
            <Input type="password" placeholder="Senha" onChange={(e) => onChangePassword(e)} style={{ marginTop: '15px' }}/>          
            <Button type="primary" size="large" block htmlType="submit" onClick={handleLogin} style={{ marginTop: '15px' }}>
              ENTRAR
            </Button>
          </Card>
        </Col>
      </Row>
    </Spin>
    :
    <Redirect to="/"/>
  )
}

export default Login;