
import React, { useState } from "react";
import { Select, InputNumber } from 'antd';
import { temperature_service } from '../../services/temperature';
import 'antd/dist/antd.css';
import './style.css';

const { Option } = Select;

const Temperature = () => {

  const [scaleFrom, setScalesFrom] = useState();
  const [scaleFor, setScalesFor] = useState();
  const [valueScale, setValueScale] = useState();
  const [scale, setScale] = useState();

  const onChangeFor = (value) => {
    setScalesFor(value);
    calculate(valueScale, scaleFrom, value);
  }
  const onChangeFrom = async (value) => {
    setScalesFrom(value);
    calculate(valueScale, value, scaleFor);
  }

  const calculate = async (e, formScale, forScale) => {
    setValueScale(e);
    let initial_scale = formScale ? formScale : scaleFrom;
    let final_scale = forScale ? forScale : scaleFor;

    let data = {
      From_scale: initial_scale,
      To_scale: final_scale,
      Temperature: e
    }

    let temperature = await temperature_service.convert_temperature(data);
    let converted_temperature = temperature.data[0].data;
    if(converted_temperature){
      setScale(converted_temperature);
    }
  }

  return (
    <div class="container">
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <h1>Conversão de temperatura</h1>
      </div>
      <div class="resize d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <div class="resize-width d-flex justify-content-center" style={{ width: "30%" }}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Escalas"
            optionFilterProp="children"
            onChange={onChangeFrom}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: "90%" }}>
            <Option value="ce">Celsius - ºC</Option>
            <Option value="fa">Fahrenheit - ºF</Option>
            <Option value="ke">Kelvin - ºK</Option>
          </Select>
        </div>
        <div class="resize-width d-flex justify-content-center" style={{ width: "30%" }}>
          <InputNumber
            placeholder='Temperatura'
            onChange={(value) => calculate(value)}
            min={1}
            precision={2}
            step={0.01}
            style={{ width: "90%", height: "80%" }} />
        </div>
        <div class="resize-width d-flex justify-content-center" style={{ width: "10%" }}>
          <p>para</p>
        </div>
        <div class="resize-width d-flex justify-content-center" style={{ width: "30%" }}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Escalas"
            optionFilterProp="children"
            onChange={onChangeFor}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: "90%" }}>
            <Option value="ce">Celsius - ºC</Option>
            <Option value="fa">Fahrenheit - ºF</Option>
            <Option value="ke">Kelvin - ºK</Option>
          </Select>
        </div>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <h2>Resultado</h2>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <div style={{ fontSize: "25px" }}>
          {scale ? scale : null}
        </div>
      </div>
    </div>
  )
}

export default Temperature;