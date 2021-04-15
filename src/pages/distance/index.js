import React, { useState } from "react";
import { Select, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import './style.css';

const { Option } = Select;

const Distance = () => {

  const [distanceFrom, setDistanceFrom] = useState();
  const [distanceFor, setDistanceFor] = useState();
  const [valueDistance, setDistance] = useState();
  const [distanceResult, setDistanceResult] = useState();

  const onChangeFor = (distanceFor) => {
    setDistanceFor(distanceFor);
    calculate(valueDistance, distanceFrom, distanceFor);
  }
  const onChangeFrom = async (value) => {
    setDistanceFrom(value);
    calculate(valueDistance, value, distanceFor);
  }

  const calculate = async (e, formDistance, forDistance) => {
    setDistance(e);
    let initial_distance = formDistance ? formDistance : distanceFrom;
    let final_distance = forDistance ? forDistance : distanceFor;

    let data = {
      From_distance: initial_distance,
      To_distance: final_distance,
      Distance: e
    }

    // let temperature = await temperature_service.convert_temperature(data);
    // let converted_temperature = temperature.data[0].data;
    // if(converted_temperature){
    //   setDistanceResult(converted_temperature);
    // }
  }

  return (
    <div class="container">
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <h1>Conversão de Distância</h1>
      </div>
      <div class="resize d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <div class="resize-width d-flex justify-content-center" style={{ width: "30%" }}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Distância"
            optionFilterProp="children"
            onChange={onChangeFrom}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: "90%" }}>
            <Option value="KM">Quilômetro - KM</Option>
            <Option value="HM">Hectometro - HM</Option>
            <Option value="DAM">Decametro - DAM</Option>
            <Option value="M">Metro - M</Option>
            <Option value="DM">Decimetro - DM</Option>
            <Option value="CM">Centímetro - CM</Option>
            <Option value="MM">Milímetro - MM</Option>
          </Select>
        </div>
        <div class="resize-width d-flex justify-content-center" style={{ width: "30%" }}>
          <InputNumber
            placeholder='Medida'
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
            placeholder="Distância"
            optionFilterProp="children"
            onChange={onChangeFor}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: "90%" }}>
            <Option value="KM">Quilômetro - KM</Option>
            <Option value="HM">Hectometro - HM</Option>
            <Option value="DAM">Decametro - DAM</Option>
            <Option value="M">Metro - M</Option>
            <Option value="DM">Decimetro - DM</Option>
            <Option value="CM">Centímetro - CM</Option>
            <Option value="MM">Milímetro - MM</Option>
          </Select>
        </div>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <h2>Resultado</h2>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <div style={{ fontSize: "25px" }}>
          {distanceResult ? distanceResult : null}
        </div>
      </div>
    </div>
  )
}

export default Distance;