
import React, { useState } from "react";
import { Select, InputNumber } from 'antd';
import { temperature_service } from '../../services/temperature';
import 'antd/dist/antd.css';
import './style.css';

const { Option } = Select;

const Imc = () => {

  // const [scaleFrom, setScalesFrom] = useState();
  // const [scaleFor, setScalesFor] = useState();
  // const [valueScale, setValueScale] = useState();
  // const [scale, setScale] = useState();

  // const onChangeFor = (value) => {
  //   setScalesFor(value);
  //   calculate(valueScale, scaleFrom, value);
  // }
  // const onChangeFrom = async (value) => {
  //   setScalesFrom(value);
  //   calculate(valueScale, value, scaleFor);
  // }

  // const calculate = async (e, formScale, forScale) => {
  //   setValueScale(e);
  //   let initial_scale = formScale ? formScale : scaleFrom;
  //   let final_scale = forScale ? forScale : scaleFor;

  //   let data = {
  //     From_scale: initial_scale,
  //     To_scale: final_scale,
  //     Temperature: e
  //   }

  //   let temperature = await temperature_service.convert_temperature(data);
  //   let converted_temperature = temperature.data[0].data;
  //   if(converted_temperature){
  //     setScale(converted_temperature);
  //   }
  // }

  return (
    <div class="container">
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <h1>Medidor de IMC</h1>
      </div>
      <div class="resize d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <div class="resize-width d-flex justify-content-center" style={{ width: "33%" }}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Sexo"
            optionFilterProp="children"
            // onChange={onChangeFrom}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: "90%" }}>
            <Option value="male">Masculino</Option>
            <Option value="female">Feminino</Option>
          </Select>
        </div>
        <div class="resize-width d-flex justify-content-center" style={{ width: "33%" }}>
          <InputNumber
            placeholder='Peso'
            // onChange={(value) => calculate(value)}
            min={1}
            precision={2}
            step={0.01}
            style={{ width: "90%" }} />
        </div>
        <div class="resize-width d-flex justify-content-center" style={{ width: "33%" }}>
          <InputNumber
          placeholder='Altura'
          // onChange={(value) => calculate(value)}
          min={1}
          precision={2}
          step={0.01}
          style={{ width: "90%" }} />
        </div>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <h2>Resultado</h2>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <div style={{ fontSize: "25px" }}>
          {/* {scale ? scale : null} */}
        </div>
      </div>
    </div>
  )
}

export default Imc;