
import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Select, InputNumber } from 'antd';
import { currency_service } from '../../services/currencies';
import './style.css';

const { Option } = Select;

const Currencies = () => {

  const [currencyFrom, setCurrencyFrom] = useState();
  const [currencyFor, setCurrencyFor] = useState();
  const [currencyValue, setCurrencyValue] = useState();
  const [currency, setCurrency] = useState();

  const onChangeFor = (value) => {
    setCurrencyFor(value);
    calculate(currencyValue, currencyFrom, value);
  }
  const onChangeFrom = async (value) => {
    setCurrencyFrom(value);
    calculate(currencyValue, value, currencyFor);
  }

  const calculate = async (e, from_currency, for_currency) => {
    setCurrencyValue(e);
    let inicial_currency = from_currency ? from_currency : currencyFrom;
    let final_currency = for_currency ? for_currency : currencyFor;

    let data = {
      From: inicial_currency,
      To: final_currency,
      Value: e
    }

    let currencies = await currency_service.convert(data);
    let conveted_currencie = currencies.data[0].data;
    if(conveted_currencie){
      setCurrency(conveted_currencie);
    }
  }

  return (
    <div class="container">
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <h2>Conversão de Moedas</h2>
      </div>
      <div class="resize d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <div class="resize-width d-flex justify-content-center" style={{ width: "30%" }}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Moedas"
            optionFilterProp="children"
            onChange={onChangeFrom}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: "90%" }}>
            <Option value="CAD">Dólar Canadense - CANADÁ</Option>
            <Option value="HKD">Dólar de Hong Kong - HONG KONG</Option>
            <Option value="ISK">Coroa islandesa - ISLÂNDIA</Option>
            <Option value="PHP">Peso filipino - FILIPINAS</Option>
            <Option value="DKK">Coroa dinamarquesa - DINAMARCA</Option>
            <Option value="HUF">Forint - HUNGRIA</Option>
            <Option value="CZK">Coroa Tcheca - REPÚBLICA CHECA</Option>
            <Option value="AUD">Dólar australiano - AUSTRÁLIA</Option>
            <Option value="RON">Leu romeno - ROMÊNIA</Option>
            <Option value="SEK">Swedish Krona - SUÉCIA</Option>
            <Option value="IDR">Rupia - INDONÉSIA</Option>
            <Option value="INR">Rupia indiana - ÍNDIA</Option>
            <Option value="BRL">Real brasileiro - BRASIL</Option>
            <Option value="RUB">Rublo russo - FEDERAÇÃO RUSSA</Option>
            <Option value="HRK">Kuna - CROÁCIA</Option>
            <Option value="JPY">Iene - JAPÃO</Option>
            <Option value="THB">Baht - TAILÂNDIA</Option>
            <Option value="CHF">Franco suíço - SUÍÇA</Option>
            <Option value="SGD">Dólar de Singapura - CINGAPURA</Option>
            <Option value="PLN">Zloty - POLÔNIA</Option>
            <Option value="BGN">Lev búlgaro - BULGÁRIA</Option>
            <Option value="TRY">Lira turca - TURQUIA</Option>
            <Option value="CNY">Yuan Renminbi - CHINA</Option>
            <Option value="NOK">Coroa norueguesa - NORUEGA</Option>
            <Option value="NZD">Dólar da Nova Zelândia - NOVA ZELÂNDIA</Option>
            <Option value="ZAR">Rand - ÁFRICA DO SUL</Option>
            <Option value="USD">Dólar americano - ESTADOS UNIDOS DA AMERICA</Option>
            <Option value="MXN">Peso mexicano - MÉXICO</Option>
            <Option value="ILS">Novo Sheqel israelense - ISRAEL</Option>
            <Option value="GBP">Libra esterlina - REINO UNIDO</Option>
            <Option value="KRW">Won - CORÉIA</Option>
            <Option value="MYR">Ringgit da Malásia - MALÁSIA</Option>
          </Select>
        </div>
        <div class="resize-width d-flex justify-content-center" style={{ width: "30%" }}>
          <InputNumber
            placeholder='Valor'
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
            placeholder="Moedas"
            optionFilterProp="children"
            onChange={onChangeFor}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: "90%" }}>
            <Option value="CAD">Dólar Canadense - CANADÁ</Option>
            <Option value="HKD">Dólar de Hong Kong - HONG KONG</Option>
            <Option value="ISK">Coroa islandesa - ISLÂNDIA</Option>
            <Option value="PHP">Peso filipino - FILIPINAS</Option>
            <Option value="DKK">Coroa dinamarquesa - DINAMARCA</Option>
            <Option value="HUF">Forint - HUNGRIA</Option>
            <Option value="CZK">Coroa Tcheca - REPÚBLICA CHECA</Option>
            <Option value="AUD">Dólar australiano - AUSTRÁLIA</Option>
            <Option value="RON">Leu romeno - ROMÊNIA</Option>
            <Option value="SEK">Swedish Krona - SUÉCIA</Option>
            <Option value="IDR">Rupia - INDONÉSIA</Option>
            <Option value="INR">Rupia indiana - ÍNDIA</Option>
            <Option value="BRL">Real brasileiro - BRASIL</Option>
            <Option value="RUB">Rublo russo - FEDERAÇÃO RUSSA</Option>
            <Option value="HRK">Kuna - CROÁCIA</Option>
            <Option value="JPY">Iene - JAPÃO</Option>
            <Option value="THB">Baht - TAILÂNDIA</Option>
            <Option value="CHF">Franco suíço - SUÍÇA</Option>
            <Option value="SGD">Dólar de Singapura - CINGAPURA</Option>
            <Option value="PLN">Zloty - POLÔNIA</Option>
            <Option value="BGN">Lev búlgaro - BULGÁRIA</Option>
            <Option value="TRY">Lira turca - TURQUIA</Option>
            <Option value="CNY">Yuan Renminbi - CHINA</Option>
            <Option value="NOK">Coroa norueguesa - NORUEGA</Option>
            <Option value="NZD">Dólar da Nova Zelândia - NOVA ZELÂNDIA</Option>
            <Option value="ZAR">Rand - ÁFRICA DO SUL</Option>
            <Option value="USD">Dólar americano - ESTADOS UNIDOS DA AMERICA</Option>
            <Option value="MXN">Peso mexicano - MÉXICO</Option>
            <Option value="ILS">Novo Sheqel israelense - ISRAEL</Option>
            <Option value="GBP">Libra esterlina - REINO UNIDO</Option>
            <Option value="KRW">Won - CORÉIA</Option>
            <Option value="MYR">Ringgit da Malásia - MALÁSIA</Option>
          </Select>
        </div>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <h2>Resultado</h2>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingBottom: "20px" }}>
        <div style={{ fontSize: "25px" }}>
          {currency ? currency : null}
        </div>
      </div>
    </div>
  )
}

export default Currencies;