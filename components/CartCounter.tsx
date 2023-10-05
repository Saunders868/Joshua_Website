"use client";

import { useState } from "react";

const CartCounter = ({
  currentCount,
}: {
  currentCount: number;
}) => {
  const [count, setCount] = useState(currentCount);
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="quantity">
      <button onClick={decrement} className="quantity__minus">
        <span>-</span>
      </button>
      <span className="quantity__input">{count}</span>
      <button onClick={increment} className="quantity__plus">
        <span>+</span>
      </button>
    </div>
  );
};

export default CartCounter;
