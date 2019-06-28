/* eslint-disable no-mixed-operators, max-len, operator-assignment, no-plusplus, object-curly-newline, prefer-destructuring, arrow-parens */
export default class QuadraticFitCoefficients {
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
}
