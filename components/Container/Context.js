import { createContext, useState } from "react";

import img1 from "/public/assets/rtx-2070.jpg";
import img2 from "/public/assets/rx-580.jpg";
import img3 from "/public/assets/rx-6900.jpg";
import img4 from "/public/assets/rtx-3090.jpg";
import img5 from "/public/assets/gtx-1660.jpg";
import img6 from "/public/assets/rx-5500.jpg";
import img7 from "/public/assets/ryzen-7.jpg";
import img8 from "/public/assets/i9.jpg";
import img9 from "/public/assets/ryzen-5.jpg";
import img10 from "/public/assets/i7.jpg";
import img11 from "/public/assets/ryzen-9.jpg";
import img12 from "/public/assets/i5.jpg";

export const BasketContext = createContext();

const BasketContextProvider = (props) => {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];
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
      value={{
        basket,
        setBasket,
        price,
        quantity,
        command,
        setCommand,
        images,
      }}
    >
      {props.children} 
    </BasketContext.Provider>
  );
};
export default BasketContextProvider;
