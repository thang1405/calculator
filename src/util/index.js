import {bigNumber} from '../constant'

export const isNumber = (n) => {
  return !isNaN(parseInt(n)) || !isNaN(parseFloat(n));
};

export const isCaculation = (n) => {
  let caculator = ["/", "⋅", "+", "-"];
  return caculator.includes(n);
};

export const convertCaculator = (c) => {
  c = c.replaceAll("--", "+");
  const length = c.length;
  var cut = 0;
  for (let i = 0; i < length; i++) {
    if (isCaculation(c[length - 1 - i])) cut++;
    if (isNumber(c[length - 1 - i])) break;
  }
  return c.slice(0, length - cut);
};

export const caculation = (str) => {
  var arr = [];
  str = str
    .replaceAll("+", " + ")
    .replaceAll("⋅", " ⋅ ")
    .replaceAll("/", " / ")
    .replaceAll("-", " -")
    .replaceAll("  ", " ");
  arr = str.split(" ");
  if (arr.length === 0 || arr.includes("NaN")) return "NaN";
  var length = arr.length;
  var array = [];
  arr = arr.map((s) => {
    return isCaculation(s) ? s : s.includes(".") ? parseFloat(s) : parseInt(s);
  });
  for (let i = 0; i < length; i++) {
    let l = array.length;
    if (isNumber(arr[i]) || arr[i] === "NaN") {
      array.push(arr[i]);
    } else if (arr[i] === "/") {
      let current = array[l - 1];
      let cacu = current / arr[i + 1];
      array[l - 1] = Math.round(cacu * bigNumber) / bigNumber;
      arr[i + 1] = "";
      arr[i] = "";
      arr[i - 1] = "";
      i = i + 1;
    } else if (arr[i] === "⋅") {
      let current = array[l - 1];
      let cacu = current * arr[i + 1];
      array[l - 1] = cacu;
      arr[i + 1] = "";
      arr[i] = "";
      arr[i - 1] = "";
      i = i + 1;
    }
  }

  if (array.length === 0) return "NaN";

  let result = array.reduce((accumulator, currentValue) => {
    let total = accumulator + currentValue;
    console.log(currentValue);
    return total;
  });

  return Math.round(result * bigNumber) / bigNumber;
};