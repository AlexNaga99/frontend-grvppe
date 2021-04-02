
import React, { useState } from "react";
import { Input, Button, message, Spin } from 'antd';
import { json_formatter_service } from '../../services/json_formatter';
import 'antd/dist/antd.css';
const { TextArea } = Input;

const JsonFormatter = () => {

  const [ noformat, setNoFormat ] = useState();
  const [ formatted, setFormatted ] = useState();
  const [ loading, setLoading ] = useState(false);

  const onConvert = async () => {
    if(validate_fields()){
      setLoading(true);

      let data = {
        json: noformat
      }
      let formated = await json_formatter_service.json_formatter(data);
      let json_formated = formated.data.data.result;
      
      if(json_formated){
        setFormatted(json_formated);
      }
      setLoading(false);
    }
  }

  const validate_fields = () => {
    if(!noformat){
      message.error(`Atenção: Alguns campos não está preenchido corretamente.`, 3);
      return false;
    }
    return true
  }

  const setText = (e) => {
    setNoFormat(e.target.value);
  }

  return (
    <Spin tip="Carregando ..." spinning={loading}>
      <div class="container">
        <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
          <h1>Formatação JSON</h1>
        </div>
        <div class="d-flex justify-content-between" style={{ paddingBottom: "20px" }}>
          <div class="d-flex justify-content-center" style={{ width: "43%" }}>
            <div class="d-flex flex-column bd-highlight" style={{ width: "100%" }}>
              <div class="bd-highlight">
                <h2 style={{ textAlign: "center" }}>Sem formatação:</h2>
              </div>
              <div class="bd-highlight">
                <TextArea rows={25} style={{ width: "100%", resize: "none" }} onChange={e => setText(e)}/>
              </div>
            </div>
          </div>
          
          <div class="d-flex align-items-end" style={{ width: "auto" }}>
            <Button onClick={onConvert}>Converter</Button>
          </div>
          <div class="d-flex justify-content-center" style={{ width: "43%" }}>
            <div class="d-flex flex-column bd-highlight" style={{ width: "100%" }}>
              <div class="bd-highlight">
                <h2 style={{ textAlign: "center" }}>Formatado:</h2>
              </div>
              <div class="bd-highlight">
                <TextArea rows={25} style={{ width: "100%", resize: "none" }} value={formatted}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default JsonFormatter;