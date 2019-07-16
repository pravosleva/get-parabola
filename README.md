# get-parabola

This module was created for have ability to receive quadratic fit coeffs for the condition like `a*x^2 + bx + c` by different ways.

## Install

```
$ yarn add get-parabola
```

## Usage

```javascript
import Coeffs from 'get-parabola';

// Or any separate method of the class if necessary:
import { by2Points } from 'get-parabola';
```

_So, you can use methods below_

- [by2Points](#by2Points) // object like `({ k, b })`
- [getLineBy2Points](#getLineBy2Points) // function like `x => number`
- [by3Points](#by3Points) // object like `({ a, b, c, error: string|null })`
- [getLineBy3Points](#getLineBy3Points) // function like `x => number` or null
- [byLeastSquaresApproximation](#byLeastSquaresApproximation) // object like `({ a, b, c })`
- [getBrokenLineByPoints](#getBrokenLineByPoints) // function like `x => number`
- [getLineByLeastSquaresApproximation](#getLineByLeastSquaresApproximation) // function like `x => number`

### by2Points

```javascript
const coeffs = Coeffs.by2Points([
  { x: 1, y: 1 },
  { x: 2, y: 2 }
]);

console.log(coeffs);
// { k: 1,
//   b: 0 }
```

### getLineBy2Points

```javascript
const lineFn = Coeffs.getLineBy2Points([
  { x: 1, y: 1 },
  { x: 2, y: 2 },
]);

console.log(lineFn(5));
// 5
```

### by3Points

```javascript
// CASE 1:
const coeffs = Coeffs.by3Points({
  x1: 1, y1: 1,
  x2: 2, y2: 4,
  x3: 3, y3: 9,
});

// CASE 2: And argument could be an Array like [{ x, y }] (but 3 points!)
const coeffs2 = Coeffs.by3Points([
  { x: 1, y: 1 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
]);

console.log(coeffs);
console.log(coeffs2);
// { a: 1,
//   b: 0,
//   c: 0,
//   error: null }
// But error could be string as explanation, check !error before use result.
```

### getLineBy3Points

```javascript
const lineFn = Coeffs.getLineBy3Points([
  { x: 1, y: 1 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
]);

console.log(lineFn(5));
// 25
```

### byLeastSquaresApproximation

```javascript
const coeffs = Coeffs.byLeastSquaresApproximation([
  { x: 4, y: 4 },
  { x: 5, y: 5 },
  { x: 6, y: 6 },
  { x: 10, y: 7 },
  { x: 12, y: 8 },
  { x: 15, y: 9 },
]);

console.log(coeffs);
// { a: -0.015889095754389806,
//   b: 0.7155842733545066,
//   c: 1.744177344577082 }
```

### getLineByLeastSquaresApproximation

```javascript
const lineFn = Coeffs.getLineByLeastSquaresApproximation([
  { x: 4, y: 4 },
  { x: 5, y: 5 },
  { x: 6, y: 6 },
  { x: 10, y: 7 },
  { x: 12, y: 8 },
  { x: 15, y: 9 },
]);

console.log(lineFn(5));
// 4.92487131748987
```

### getBrokenLineByPoints

```javascript
const lineFn = Coeffs.getBrokenLineByPoints([
  { x: 4, y: 4 },
  { x: 5, y: 5 },
  { x: 6, y: 6 },
  { x: 10, y: 7 },
  { x: 12, y: 8 },
  { x: 15, y: 9 },
]);

console.log(lineFn(24));
// 12
// This function gives result in lines between your points or interpolate in
// external cases
```

## Commands

- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

## License

MIT © Den Pol
