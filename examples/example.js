/* eslint-disable no-console */
const defaultAwesomeFunction = require('../lib').default;
const { getQuadraticCoefficients } = require('../lib');

const defaultVal = defaultAwesomeFunction('Thanx to Dinesh');
const val = getQuadraticCoefficients({
  x1: 1, y1: 1,
  x2: 2, y2: 4,
  x3: 3, y3: 9,
});

// defaultVal === 'I am the Default Awesome Function, fellow comrade! - Thanx to Dinesh'
console.log(defaultVal);
// val is ({ a: 1, b: 0, c: 0 })
console.log(val);
