import React from "react";

import "./CurrencyBlock.scss";

const defaultCurrencies = ["RUB", "USD", "EUR", "GBP"];

const CurrencyBlock = ({
  title,
  value,
  currency,
  onChangeValue,
  onChangeCurrency,
}) => (
  <div className="currency-block">
    <h2 className="currency-block__title">{title}</h2>
    <ul className="currency-block__currencies currencies">
      {defaultCurrencies.map((item) => (
        <li
          onClick={() => onChangeCurrency(item)}
          className={
            currency === item
              ? "currencies__item currencies__item_active"
              : "currencies__item"
          }
          key={item}
        >
          {item}
        </li>
      ))}
      {/* <li>
        <svg height="50px" viewBox="0 0 50 50" width="50px">
          <rect fill="none" height="50" width="50" />
          <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
        </svg>
      </li> */}
    </ul>
    <input
      className="currency-block__input"
      onChange={(e) => onChangeValue(e.target.value)}
      value={value}
      type="number"
      placeholder={0}
    />
  </div>
);

export default CurrencyBlock;
