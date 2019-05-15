import { assert } from 'chai';
import Immutable from 'immutable';
import defaultAwesomeFunction, { getQuadraticCoefficients } from '../src';

describe('Awesome test.', () => {
  it('should test default awesome function', () => {
    const expectedVal = 'I am the Default Awesome Function, fellow comrade! - Tnax to Dinesh'
    assert(defaultAwesomeFunction('Tnax to Dinesh') === expectedVal, 'Default not awesome :(');
  });

  it('getQuadraticCoefficients() 3 points isn\'t in same line', () => {
    const expectedObj = Immutable.Map({ a: 1, b: 0, c: 0 });
    const testObj = Immutable.Map(getQuadraticCoefficients({
      x1: 1, y1: 1,
      x2: 2, y2: 4,
      x3: 3, y3: 9,
    }));

    assert(testObj.equals(expectedObj), 'FuckUp :(');
  });
});
