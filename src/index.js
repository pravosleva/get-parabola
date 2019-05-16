/* eslint-disable no-mixed-operators, max-len, operator-assignment, no-plusplus */
export default class getQuadraticFitCoefficients {
  static by3Points({
    x1, y1,
    x2, y2,
    x3, y3,
  }) {
    const a = (y1 * (x2 - x3) + y2 * (x3 - x1) + y3 * (x1 - x2)) / ((x1 - x2) * (x2 - x3) * (x1 - x3));
    const b = (y1 - y2 - a * ((x1 ** 2) - (x2 ** 2))) / (x1 - x2);
    const c = y1 - a * (x1 ** 2) - b * x1;

    return { a, b, c };
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
