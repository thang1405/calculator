import React, { useReducer, useEffect, useState } from "react";
import ButtonCalculator from "./ButtonCalculator";
import { reducer , initState } from "../reducer";
import { limitDigitLength } from "../constant/index";

const Caculator = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const InputCacu = ({ number }) => {
    const [input, setInput] = useState(number);
    const [isOverDigit, setOverDigit] = useState(false);

    useEffect(() => {
      if (number.length < limitDigitLength) {
        setInput(number);
        setOverDigit(false);
      } else {
        setInput("digit limit met");
        setOverDigit(true);
      }

      if (isOverDigit) {
        const num = number.slice(0, limitDigitLength-1);
        setTimeout(() => {
          setInput(num);
          dispatch({ type: "over", value: num });
        }, 800);
      }
    }, [number,isOverDigit]);

    return <div className="fomula input text-white text-right">{input}</div>;
  };

  return (
    <div className="bg-gray-300 h-screen w-screen ">
      <div className="inline-block caculator h-auto border-gray-600 border-2 p-1 bg-black ">
        <div className="">
          <div className="fomula leading-5 text-yellow-600 min-h-5 text-xl text-right flex-wrap">
            {state.calculation}
          </div>
          <InputCacu number={state.input} />
        </div>

        <div className="flex flex-row">
          <div className="left-container">
            <ButtonCalculator
              type={"AC"}
              value={"AC"}
              onClick={() => dispatch({ type: "AC" })}
            />
            <ButtonCalculator
              type={"normal"}
              value={"/"}
              onClick={() =>
                dispatch({ type: "other_calculation", value: "/" })
              }
            />
            <ButtonCalculator
              type={"normal"}
              value={7}
              onClick={() => dispatch({ type: "number", value: "7" })}
            />
            <ButtonCalculator
              type={"normal"}
              value={8}
              onClick={() => dispatch({ type: "number", value: "8" })}
            />
            <ButtonCalculator
              type={"normal"}
              value={9}
              onClick={() => dispatch({ type: "number", value: "9" })}
            />
            <ButtonCalculator
              type={"normal"}
              value={4}
              onClick={() => dispatch({ type: "number", value: "4" })}
            />
            <ButtonCalculator
              type={"normal"}
              value={5}
              onClick={() => dispatch({ type: "number", value: "5" })}
            />
            <ButtonCalculator
              type={"normal"}
              value={6}
              onClick={() => dispatch({ type: "number", value: "6" })}
            />
            <ButtonCalculator
              type={"normal"}
              value={1}
              onClick={() => dispatch({ type: "number", value: "1" })}
            />
            <ButtonCalculator
              type={"normal"}
              value={2}
              onClick={() => dispatch({ type: "number", value: "2" })}
            />
            <ButtonCalculator
              type={"normal"}
              value={3}
              onClick={() => dispatch({ type: "number", value: "3" })}
            />
            <ButtonCalculator
              type={"zero"}
              value={0}
              onClick={() => dispatch({ type: "number", value: "0" })}
            />
            <ButtonCalculator
              type={"normal"}
              value={"."}
              onClick={() => dispatch({ type: "float", value: "." })}
            />
          </div>

          <div className="right-container">
            <ButtonCalculator
              type={"normal"}
              value={"x"}
              onClick={() =>
                dispatch({ type: "other_calculation", value: "⋅" })
              }
            />
            <ButtonCalculator
              type={"normal"}
              value={"-"}
              onClick={() => dispatch({ type: "minus", value: "-" })}
            />
            <ButtonCalculator
              type={"normal"}
              value={"+"}
              onClick={() =>
                dispatch({ type: "other_calculation", value: "+" })
              }
            />
            <ButtonCalculator
              type={"equal"}
              value={"="}
              onClick={() => dispatch({ type: "result" })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Caculator;
