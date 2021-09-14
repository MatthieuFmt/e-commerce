import { createContext, useState } from "react";

export const BasketContext = createContext();

const BasketContextProvider = (props) => {
  const [basket, setBasket] = useState([]),
    [command, setCommand] = useState(false);

  let price = 0,
    quantity = 0;

  for (const item of basket) {
    quantity += item.quantity;
    price += item.totalPrice;
  }

  return (
    <BasketContext.Provider
      value={{ basket, setBasket, price, quantity, command, setCommand }}
    >
      {props.children} 
    </BasketContext.Provider>
  );
};
export default BasketContextProvider;
