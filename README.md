# get-parabola

This module was created to have ability to receive coeffs for the condition like `(a * (x ** 2)) + (b * x) + c` for the different cases.

## Install

```
$ yarn add get-parabola
```

## Usage

Could be imported like this:

```javascript
import getQuadraticFitCoefficients from 'get-parabola';
```

### 1. By three points

```javascript
const coeffs = getQuadraticFitCoefficients.by3Points({
  x1: 1, y1: 1,
  x2: 2, y2: 4,
  x3: 3, y3: 9,
});

console.log(coeffs);
// { a: 1, b: 0, c: 0 }
```

### 2. By least squares approximation

```javascript
const coeffs = getQuadraticFitCoefficients.byLeastSquaresApproximation([
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
