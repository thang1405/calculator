import { produce } from "immer";
import {
  isNumber,
  isCaculation,
  convertCaculator,
  caculation,
} from "../util/index";
import { limitDigitLength } from "../constant/index";

export const initState = {
  input: "0",
  calculation: "",
};

export const reducer = (state, action) =>
  produce(state, (draft) => {
    let lengthCalculation = draft.calculation.length;
    switch (action.type) {
      case "AC":
        draft.input = "0";
        draft.calculation = "";
        break;
      case "other_calculation":
        if (draft.calculation.includes("=")) {
          draft.calculation = draft.input;
          draft.input = action.value;
          draft.calculation += action.value;
        } else if (isNumber(draft.input)) {
          //input before is number
          draft.input = action.value;
          draft.calculation += action.value;
        } else if (
          draft.input !== action.value &&
          isCaculation(draft.input) &&
          isCaculation(draft.calculation[lengthCalculation - 2])
        ) {
          // 2 caculation next
          draft.input = action.value;
          draft.calculation =
            draft.calculation.slice(0, draft.calculation.length - 2) +
            action.value;
        } else if (draft.input !== action.value && isCaculation(draft.input)) {
          // 2 caculation next
          draft.input = action.value;
          draft.calculation =
            draft.calculation.slice(0, draft.calculation.length - 1) +
            action.value;
        }
        break;
      case "minus":
        if (draft.calculation.includes("=")) {
          draft.calculation = draft.input;
          draft.input = action.value;
          draft.calculation += action.value;
        } else if (isNumber(draft.input)) {
          //input before is number
          draft.input = "-";
          draft.calculation += "-";
        } else if (
          isCaculation(draft.input) &&
          isNumber(draft.calculation[lengthCalculation - 2])
        ) {
          //input before is caculatin
          draft.input = "-";
          draft.calculation += "-";
        } else if (isCaculation(draft.calculation)) {
          // begin is caculation
          draft.input = "-";
          draft.calculation = "-";
        }
        break;
      case "number":
        //clear input if need
        if (
          draft.calculation.includes("=") ||
          (draft.input === "0" && draft.calculation === "0")
        ) {
          draft.input = "";
          draft.calculation = "";
        } else if (
          draft.input === "0" ||
          (!draft.input.includes(".") && isNaN(parseInt(draft.input)))
        ) {
          draft.input = "";
        }

        // add to input and calculation
        if (draft.input.length < limitDigitLength - 1) {
          if (
            isCaculation(draft.calculation[lengthCalculation - 2]) &&
            draft.calculation[lengthCalculation - 1] === "0"
          ) {
            draft.calculation =
              draft.calculation.slice(0, draft.calculation.length - 1) +
              action.value;
          } else {
            draft.calculation += action.value;
          }
          draft.input += action.value;
          // length up to 21
        } else if (draft.input.length === limitDigitLength - 1) {
          draft.input += action.value;
          //length  up to 22
        }
        break;
      case "over":
        draft.input = action.value;
        break;
      case "float":
        if (draft.calculation.includes("=")) {
          draft.input = "0.";
          draft.calculation = "0.";
        } else if (
          isCaculation(draft.calculation[lengthCalculation - 1]) ||
          draft.input === "" ||
          (draft.input === "0" &&
            draft.calculation[lengthCalculation - 1] !== "0")
        ) {
          draft.input = "0.";
          draft.calculation += "0.";
        } else if (!draft.input.includes(".")) {
          draft.input += ".";
          draft.calculation += ".";
        }
        break;
      case "result":
        if (
          !draft.calculation.includes("=") &&
          draft.calculation[0] !== "/" &&
          draft.calculation[0] !== "⋅"
        ) {
          let convert = convertCaculator(draft.calculation);
          let result = caculation(convert);
          if (result === undefined) result = "NaN";
          draft.calculation += "=" + result;
          draft.input = result + "";
        }
        break;
      default:
        throw new Error();
    }
  });
