# Get Parabola

Quadratic function coeffs by three points.
For math function like `(a * (x ** 2)) + (b * x) + c`.

## Usage

```javascript
import { getQuadraticCoefficients } from 'get-parabola';

const coeffs = getQuadraticCoefficients({
  x1: 1, y1: 1,
  x2: 2, y2: 4,
  x3: 3, y3: 9,
});

console.log(coeffs); // { a: 1, b: 0, c: 0 }
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
