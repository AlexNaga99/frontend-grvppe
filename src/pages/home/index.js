
import React from "react";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const Home = () => {

  return (
    <div className="home d-flex justify-content-center">
      <div>
        <img src="../../logo-convertme.png" alt="logo-convertme" width="400px" height="400px"/>
      </div>
      <div className="d-flex align-items-center">
        <div class="d-flex flex-column bd-highlight">
          <div class="bd-highlight">
            <h2>Convertme</h2>
          </div>
          <div class="bd-highlight">
            <p>
              Site com ferramentas elaboradas principalmente para os estudantes e 
              profissionais, oferecemos conversões rápidas, do simples ao complexo,
              para melhorar o seu dia, e não perder seu tempo, desenvolvido para
              atender todo tipo de conversão.
              <br/><br/>
              Achou algum bug ou erro ? <br/>
              Sugestões para o site ? <br/>
              Contate nossa equipe, que ficaremos muito agradecidos pela informação. 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;