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

- [by2Points](#by2Points) // Прямая как частный случай параболы
- [by3Points](#by3Points)
- [byLeastSquaresApproximation](#byLeastSquaresApproximation)
- [getBrokenLineByPoints](#getBrokenLineByPoints)

### by2Points

```javascript
const coeffs = Coeffs.by2Points([
  { x: 1, y: 1 },
  { x: 2, y: 2 }
]);

console.log(coeffs);
// { k: 1, b: 0 }
```

### by3Points

```javascript
// CASE 1:
const coeffs = Coeffs.by3Points({
  x1: 1, y1: 1,
  x2: 2, y2: 4,
  x3: 3, y3: 9,
});

console.log(coeffs);
// { a: 1, b: 0, c: 0, error: null }
// But coeffs.error could be string as explanation, check !coeffs.error before using result object.

// CASE 2: And argument could be an Array like [{ x, y }] (but 3 points!)
const coeffs2 = Coeffs.by3Points([
  { x: 1, y: 1 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
]);
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
// {
//   a: -0.015889095754389806,
//   b: 0.7155842733545066,
//   c: 1.744177344577082,
// }
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
