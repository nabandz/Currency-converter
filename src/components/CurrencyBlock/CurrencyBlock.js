import { useState } from "react";

import "./currencyBlock.scss";

const defaultCurrency = ["RUB", "USD", "EUR", "GBP"];

const CurrencyBlock = ({
  title,
  value,
  allCurrency,
  currency,
  onChangeValue,
  onChangeCurrency,
}) => {
  const [openList, setOpenList] = useState(false);

  return (
    <div className="currency-block">
      <h2 className="currency-block__title">{title}</h2>
      <ul className="currency-block__currency-panel currency-panel">
        {defaultCurrency.map((item) => (
          <li
            onClick={() => onChangeCurrency(item)}
            className={`currency-panel__item ${
              currency === item ? "currency-panel__item_active" : ""
            }`}
            key={item}
          >
            {item}
          </li>
        ))}
        <li
          onClick={() => setOpenList(!openList)}
          className="currency-panel__item"
        >
          <svg height="50px" viewBox="0 0 50 50" width="50px">
            <rect fill="none" height="50" width="50" />
            <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
          </svg>
        </li>
      </ul>
      <ul
        className={`currency-block__currency-list currency-list ${
          openList ? "" : "hide"
        }`}
      >
        {allCurrency.map((item) => (
          <li
            onClick={() => {
              onChangeCurrency(item);
              setOpenList(false);
            }}
            className={`currency-list__item ${
              currency === item ? "currency-list__item_active" : ""
            }`}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
      <input
        className="currency-block__input input"
        onChange={(e) => onChangeValue(e.target.value)}
        value={value}
        type="number"
        placeholder={0}
      />
      <label className="input__label">{currency}</label>
    </div>
  );
};

export default CurrencyBlock;
