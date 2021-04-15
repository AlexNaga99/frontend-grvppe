
import React from "react";
import 'antd/dist/antd.css';
import './style.css';

const NotFound = () => {

  return (
    <div className="not-found d-flex justify-content-center">
      <div className="d-flex justify-content-center flex-column bd-highlight">
        <div class="bd-highlight d-flex justify-content-center">
          <a href="https://www.convertme.com.br/">
            <img src="../../logo-convertme.png" alt="logo-convertme" width="400px" height="400px"/>
          </a>
        </div>
        <div class="bd-highlight">
          <h1 style={{textAlign: "center" }}>Oops, página não encontrada!</h1>
          <h2 style={{textAlign: "center" }}>Para qualquer dúvida contate nossa equipe!</h2>
        </div>
      </div>
    </div>
  )
}

export default NotFound;