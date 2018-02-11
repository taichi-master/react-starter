import { assert, expect } from 'chai'

import reducer from  'reducers/value'
import * as types from 'models/actionTypes'

describe('Reducers', function () {
  
  describe('value', function () {

    it('should return the initial state', function () {
      expect(
        reducer(undefined, {})
      ).to.be.equal('');
    });

    it('should handle SET_VALUE', function () {
      expect(
        reducer('', {
          type: types.SET_VALUE,
          value: 'abc'
        })
      ).to.be.equal('abc');
    });
  });
});
