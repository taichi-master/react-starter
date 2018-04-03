import { assert, expect } from 'chai'

import * as actions from 'models/actions'
import * as types from 'models/actionTypes'

describe('Actions', function () {

  describe('setValue', function () {

    before(function () {
      this.value = 'abc';
      this.expectedAction = {type: types.SET_VALUE, value: this.value};
    });

    it('should create an action to set a value', function () {
      expect(actions.setValue(this.value)).to.be.deep.equal(this.expectedAction);
    });
  });
});
