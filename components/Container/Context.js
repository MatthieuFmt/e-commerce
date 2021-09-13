import React, { createContext, useState } from "react";

export const BasketContext = createContext();

const BasketContextProvider = (props) => {
  const [basket, setBasket] = useState([]);

  let price = 0;
  for (const item of basket) {
    price += item.totalPrice;
  }

  let quantity = 0;
  for (const item of basket) {
    quantity += item.quantity;
  }

  const [command, setCommand] = useState(false);

  return (
    <BasketContext.Provider
      value={{ basket, setBasket, price, quantity, command, setCommand }}
    >
      {props.children} 
    </BasketContext.Provider>
  );
};
export default BasketContextProvider;
