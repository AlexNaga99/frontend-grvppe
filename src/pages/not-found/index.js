
import React from "react";
import 'antd/dist/antd.css';
import './style.css';

const NotFound = () => {

  return (
    <div className="not-found d-flex justify-content-center">
      <div className="d-flex justify-content-center flex-column bd-highlight">
        <div class="bd-highlight">
          <h1 style={{textAlign: "center" }}>Oops, página não encontrada!</h1>
        </div>
      </div>
    </div>
  )
}

export default NotFound;