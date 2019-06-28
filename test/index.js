import { assert } from 'chai';
import Immutable from 'immutable';
import { by3Points, byLeastSquaresApproximation } from '../src';

describe('Awesome test.', () => {
  it('1.1 by3Points() isn\'t in same line', () => {
    const expectedObj = Immutable.Map({ a: 1, b: 0, c: 0, error: null });
    const testObj = Immutable.Map(by3Points({
      x1: 1, y1: 1,
      x2: 2, y2: 4,
      x3: 3, y3: 9,
    }));

    assert(
      testObj.equals(expectedObj),
      'FuckUp :(',
    );
  });

  it('1.2 by3Points() x1 === x2; result.error is string', () => {
    const expectedObj = Immutable.Map({ a: null, b: null, c: null, error: 'Impossible / Указанные точки не для квадратичной функции!' });
    const testObj = Immutable.Map(by3Points({
      x1: 1, y1: 1,
      x2: 1, y2: 4,
      x3: 3, y3: 9,
    }));

    assert(
      testObj.equals(expectedObj),
      'FuckUp :(',
    );
  });

  it('1.3 by3Points() all points in same line f(x)=x', () => {
    const expectedObj = Immutable.Map({ a: 0, b: 1, c: 0, error: null });
    const testObj = Immutable.Map(by3Points({
      x1: 1, y1: 1,
      x2: 2, y2: 2,
      x3: 3, y3: 3,
    }));

    assert(
      testObj.equals(expectedObj),
      `FuckUp :( ${JSON.stringify(testObj)}`,
    );
  });

  // by3Points2
  it('1.4 by3Points() as Array', () => {
    const expectedObj = Immutable.Map({ a: 1, b: 0, c: 0, error: null });
    const testObj = Immutable.Map(by3Points([
      { x: 1, y: 1 },
      { x: 2, y: 4 },
      { x: 3, y: 9 },
    ]));

    assert(
      testObj.equals(expectedObj),
      `FuckUp :( ${JSON.stringify(testObj)}`,
    );
  });

  it('1.5 by3Points() in line', () => {
    const testObj = by3Points([
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 3, y: 9 },
    ]);

    assert(
      typeof testObj.error === 'string',
      `FuckUp :( ${JSON.stringify(testObj)}`,
    );
  });

  it('1.6 by3Points() no x1', () => {
    const testObj = by3Points([
      { y: 1 },
      { x: 1, y: 2 },
      { x: 3, y: 9 },
    ]);

    assert(
      typeof testObj.error === 'string',
      `FuckUp :( ${JSON.stringify(testObj)}`,
    );
  });

  it('2. byLeastSquaresApproximation()', () => {
    const expectedObj = Immutable.Map({
      a: -0.015889095754389806,
      b: 0.7155842733545066,
      c: 1.744177344577082,
    });
    const arr = [
      { x:4, y:4 },
      { x:5, y:5 },
      { x:6, y:6 },
      { x:10, y:7 },
      { x:12, y:8 },
      { x:15, y:9 },
    ];
    const coeffs = byLeastSquaresApproximation(arr);
    const testedObj = Immutable.Map(coeffs);

    assert(
      testedObj.equals(expectedObj),
      `FuckUp! coeffs is ${JSON.stringify(coeffs)}`,
    );
  });
});
