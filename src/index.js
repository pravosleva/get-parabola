/* eslint-disable no-mixed-operators, max-len */
const defaultAwesomeFunction = (str) => {
  const returnStr = `I am the Default Awesome Function, fellow comrade! - ${str}`;
  return returnStr;
};

const getQuadraticCoefficients = ({
  x1, y1,
  x2, y2,
  x3, y3,
}) => {
  const a = (y1 * (x2 - x3) + y2 * (x3 - x1) + y3 * (x1 - x2)) / ((x1 - x2) * (x2 - x3) * (x1 - x3));
  const b = (y1 - y2 - a * ((x1 ** 2) - (x2 ** 2))) / (x1 - x2);
  const c = y1 - a * (x1 ** 2) - b * x1;

  return { a, b, c };
};

export default defaultAwesomeFunction;

export { getQuadraticCoefficients };
