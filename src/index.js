/* eslint-disable no-mixed-operators, max-len, operator-assignment, no-plusplus, object-curly-newline, prefer-destructuring, arrow-parens */
import { getKB, linear } from 'interpolate-by-pravosleva';


const getNormalized2Points = (arr) => {
  const [p1, p2] = arr;

  return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
};

export default class Coeffs {
  static by2Points(points) {
    return getKB(getNormalized2Points(points));
  }

  static getLineBy2Points(points) {
    const { k, b } = Coeffs.by2Points(points);

    return x => (k * x) + b;
  }

  static by3Points(arg) {
    let x1;
    let x2;
    let x3;
    let y1;
    let y2;
    let y3;

    let a = null;
    let b = null;
    let c = null;
    let error = null;

    // Errs
    const requiredFields0 = ['x', 'y'];
    const checkPoints = arr => {
      const results = [];

      arr.map(p => {
        const keys = Object.keys(p);

        for (let j = 0; j < requiredFields0.length; j++) {
          if (keys.includes(requiredFields0[j])) {
            results.push(true);
          } else {
            results.push(false);
          }
        }

        return false;
      });

      return !results.includes(false);
    };
    const requiredFields1 = ['x1', 'x2', 'x3', 'y1', 'y2', 'y3'];
    const checkObj = obj => {
      const results = [];
      const keys = Object.keys(obj);

      for (let i = 0; i < requiredFields1.length; i++) {
        if (keys.includes(requiredFields1[i])) {
          results.push(true);
        } else {
          results.push(false);
        }
      }

      return !results.includes(false);
    };

    if (Array.isArray(arg)) {
      if (!checkPoints(arg)) {
        return { error: 'FUCKUP! Каких-то полей не хватает =)' };
      }

      arg.map((p, i) => {
        switch (i) {
          case 0:
            x1 = p.x;
            y1 = p.y;
            break;
          case 1:
            x2 = p.x;
            y2 = p.y;
            break;
          case 2:
            x3 = p.x;
            y3 = p.y;
            break;
          default:
            break;
        }

        return false;
      });
    } else {
      if (!checkObj(arg)) {
        return { error: 'FUCKUP! Каких-то полей не хватает =)' };
      }

      x1 = arg.x1;
      y1 = arg.y1;
      x2 = arg.x2;
      y2 = arg.y2;
      x3 = arg.x3;
      y3 = arg.y3;
    }

    if (x1 === x2 || x2 === x3 || x3 === x1) {
      error = 'Impossible / Указанные точки не для квадратичной функции!';
    } else {
      a = (y1 * (x2 - x3) + y2 * (x3 - x1) + y3 * (x1 - x2)) / ((x1 - x2) * (x2 - x3) * (x1 - x3));
      b = (y1 - y2 - a * ((x1 ** 2) - (x2 ** 2))) / (x1 - x2);
      c = y1 - a * (x1 ** 2) - b * x1;
    }

    return { a, b, c, error };
  }

  static getLineBy3Points(points) {
    const coeffs = Coeffs.by3Points(points);
    const { error, a, b, c } = coeffs;

    if (!error) {
      return x => (a * x * x) + (b * x) + c;
    }

    return null;
  }

  static byLeastSquaresApproximation(coordinatesArray) {
    const z = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    for (let i = 0; i < coordinatesArray.length; i++) {
      z[0][0] = z[0][0] + ((coordinatesArray[i].x) ** (4));
      z[0][1] = z[0][1] + ((coordinatesArray[i].x) ** (3));
      z[0][2] = z[0][2] + ((coordinatesArray[i].x) ** (2));
      z[0][3] = z[0][3] + (((coordinatesArray[i].x) ** (2)) * coordinatesArray[i].y);

      z[1][0] = z[1][0] + ((coordinatesArray[i].x) ** (3));
      z[1][1] = z[1][1] + ((coordinatesArray[i].x) ** (2));
      z[1][2] = z[1][2] + (coordinatesArray[i].x);
      z[1][3] = z[1][3] + (coordinatesArray[i].x * coordinatesArray[i].y);

      z[2][0] = z[2][0] + ((coordinatesArray[i].x) ** (2));
      z[2][1] = z[2][1] + (coordinatesArray[i].x);
      z[2][2] = z[2][2] + 1;
      z[2][3] = z[2][3] + coordinatesArray[i].y;
    }

    const k1 = z[0][1] * z[1][2] - z[1][1] * z[0][2];
    const k2 = z[1][1] * z[2][2] - z[2][1] * z[1][2];
    let a = k2 * (z[0][3] * z[1][2] - z[1][3] * z[0][2]) - k1 * (z[1][3] * z[2][2] - z[2][3] * z[1][2]);
    const l = k2 * (z[0][0] * z[1][2] - z[1][0] * z[0][2]) - k1 * (z[1][0] * z[2][2] - z[2][0] * z[1][2]);
    a = a / l;
    const b = (z[1][3] * z[2][2] - z[2][3] * z[1][2] - a * (z[1][0] * z[2][2] - z[2][0] * z[1][2])) / k2;
    const c = (z[0][3] - a * z[0][0] - b * z[0][1]) / z[0][2];

    return { a, b, c };
  }

  static getLineByLeastSquaresApproximation(points) {
    const coeffs = Coeffs.byLeastSquaresApproximation(points);
    const { a, b, c } = coeffs;

    return x => (a * x * x) + (b * x) + c;
  }

  static getBrokenLineByPoints(points) {
    const sortedPoints = [...points].sort((p1, p2) => p1.x - p2.x);

    return h => {
      let x1;
      let x2;
      let y1;
      let y2;

      if (h <= sortedPoints[0].x) {
        x1 = sortedPoints[0].x;
        x2 = sortedPoints[1].x;
        y1 = sortedPoints[0].y;
        y2 = sortedPoints[1].y;
      } else if (h >= sortedPoints[sortedPoints.length - 1].x) {
        x1 = sortedPoints[sortedPoints.length - 2].x;
        x2 = sortedPoints[sortedPoints.length - 1].x;
        y1 = sortedPoints[sortedPoints.length - 2].y;
        y2 = sortedPoints[sortedPoints.length - 1].y;
      } else {
        for (let i = 0; i < sortedPoints.length - 1; i++) {
          if (h >= sortedPoints[i].x && h <= sortedPoints[i + 1].x) {
            x1 = sortedPoints[i].x;
            x2 = sortedPoints[i + 1].x;
            y1 = sortedPoints[i].y;
            y2 = sortedPoints[i + 1].y;
            break;
          }
        }
      }

      return linear({ x: h, x1, y1, x2, y2 });
    };
  }
}
