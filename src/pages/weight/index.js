
import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Select, message, InputNumber } from 'antd';
import { weight_service } from '../../services/weight';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Option } = Select;

const Weight = () => {

  const [weight, setWeight] = useState();
  const [typeUnitFor, setTypeUnitFor] = useState();
  const [typeUnitFrom, setTypeUnitFrom] = useState();
  const [convert_weight, setConvert_weight] = useState();

  const onChangeFor = (value) => {
    setTypeUnitFor(value);
    if(value !== typeUnitFrom && typeUnitFrom){
      calculate(weight, typeUnitFrom, value);
    }
  }

  const onChangeFrom = (value) => {
    setTypeUnitFrom(value);
    if(typeUnitFor && typeUnitFor !== value){
      calculate(weight, value, typeUnitFor);
    }
  }

  const calculate = async (e, unitFrom, unitFor) => {
    let ufrom = unitFrom ? unitFrom : typeUnitFrom;
    let ufor = unitFor ? unitFor : typeUnitFor;
    setWeight(e);

    let data = {
      From_weight: ufrom,
      For_weight: ufor,
      weight: e
    }

    let weight = await weight_service.convert_weight(data);
    let converted = weight.data[0].data;
    if(converted){
      setConvert_weight(converted);
    }
  }

  return (
    <div class="container">
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <h2>Conversão de peso</h2>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <div class="d-flex justify-content-center" style={{ width: "30%" }}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Unidade de peso"
            optionFilterProp="children"
            onChange={onChangeFrom}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: "90%" }}>
              <Option value="kg">Quilograma - kg</Option>
              <Option value="hg">Hectograma - hg</Option>
              <Option value="dag">Decagrama - dag</Option>
              <Option value="g">Grama - g</Option>
              <Option value="dg">Decagramo - dg</Option>
              <Option value="cg">Centigrama - cg</Option>
              <Option value="mg">Miligrama - mg</Option>
          </Select>
        </div>
        <div class="d-flex justify-content-center" style={{ width: "30%" }}>
          <InputNumber
              placeholder='Peso'
              onChange={(value) => calculate(value)}
              min={1}
              precision={2}
              step={0.01}
              style={{ width: "90%", height: "80%" }}/>
        </div>
        <div class="d-flex justify-content-center" style={{ width: "10%" }}>
          <p>para</p>
        </div>
        <div class="d-flex justify-content-center" style={{ width: "30%" }}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Unidade de peso"
            optionFilterProp="children"
            onChange={onChangeFor}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: "90%" }}>
              <Option value="all">Todos</Option>
              <Option value="kg">Quilograma - kg</Option>
              <Option value="hg">Hectograma - hg</Option>
              <Option value="dag">Decagrama - dag</Option>
              <Option value="g">Grama - g</Option>
              <Option value="dg">Decagramo - dg</Option>
              <Option value="cg">Centigrama - cg</Option>
              <Option value="mg">Miligrama - mg</Option>
          </Select>
        </div>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <h2>Resultado</h2>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <div class="d-flex flex-column bd-highlight">
          {convert_weight ? 
          
          Object.keys(convert_weight).map((k) => {
            let item = convert_weight[k];
              return <div class="bd-highlight">
                <div style={{ fontSize: "25px" }}>
                  {item}
                </div>
              </div>
            })

          : null }
        </div>   
      </div>
    </div>
  )
}

export default Weight;