/* eslint-disable no-console */
// const Coeffs = require('../lib').default;
const { by3Points } = require('../lib');

// const defaultVal = Coeffs('Thanx to Dinesh');
const val = by3Points({
  x1: 1, y1: 1,
  x2: 2, y2: 4,
  x3: 3, y3: 9,
});

// defaultVal === 'I am the Default Awesome Function, fellow comrade! - Thanx to Dinesh'
// console.log(defaultVal);

// val is ({ a: 1, b: 0, c: 0 })
console.log(val);
