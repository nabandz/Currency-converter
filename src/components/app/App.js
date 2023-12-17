import { useState, useEffect, useRef } from "react";
import CurrencyBlock from "../CurrencyBlock/CurrencyBlock";

import "./App.scss";

function App() {
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);
  const [date, setDate] = useState();

  const ratesRef = useRef({});

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        ratesRef.current.RUB = 1;
        setDate(json.date);
        onChangeToPrice(1);
      })
      .catch((err) => {
        alert("Не удалось получить информацию");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(2));
    setToPrice(value);
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  return (
    <div className="app">
      <h1 className="title">Конвертер валют &#128181;</h1>
      <div className="wrapper">
        <CurrencyBlock
          title={"У меня есть"}
          value={fromPrice}
          allCurrency={Object.keys(ratesRef.current)}
          currency={fromCurrency}
          onChangeCurrency={setFromCurrency}
          onChangeValue={onChangeFromPrice}
        />
        <CurrencyBlock
          title={"Я получу"}
          value={toPrice}
          allCurrency={Object.keys(ratesRef.current)}
          currency={toCurrency}
          onChangeCurrency={setToCurrency}
          onChangeValue={onChangeToPrice}
        />
      </div>
      <p className="date-info">{`Данные за ${formatDate(date)}`}</p>
    </div>
  );
}

export default App;
