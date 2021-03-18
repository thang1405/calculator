import React from "react";

const ButtonCalculator = ({type,onClick,value}) => {
  const className = {
    normal: "w-20 h-16 text-xl text-white btn",
    zero: "w-40 h-16 text-xl text-white btn",
    AC: "w-40 h-16 text-xl text-white btn delete ",
    equal: "w-20 h-32 text-xl text-white  btn equal",
  };
  return (
    <button className={className[type]} onClick={onClick}>
      {value}
    </button>
  );
};

export default ButtonCalculator;
