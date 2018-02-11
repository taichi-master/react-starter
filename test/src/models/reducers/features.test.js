import { assert, expect } from 'chai'

import reducer from  'reducers/features'
import * as types from 'models/actionTypes'

describe('Reducers', function () {

  describe('features', function () {

    const initState = {
            isFetching: false,
            didInvalidate: true,
            contents: []
          },
          testContents = ["Hey there!", "Yes?"],
          testTime = Date.now();

    beforeEach(function () {
      this.state = {
        isFetching: false,
        didInvalidate: true,
        contents: []
      };
    });

    it('should return the initial state', function () {
      expect(
        reducer(undefined, {})
      ).to.be.deep.equal(this.state);
    });

    it('should handle INVALIDATE_FEATURES', function () {
      this.state.didInvalidate = false;
      var newState = reducer(this.state, {
        type: types.INVALIDATE_FEATURES,
      });
      expect(newState).to.be.deep.equal(initState);
      expect(newState).not.equal(this.state); // it is important to include this check, since each state should be a new object.
    });

    it('should handle REQUEST_FEATURES', function () {
      var newState = reducer(this.state, {
        type: types.REQUEST_FEATURES,
      });
      this.state.isFetching = true;
      this.state.didInvalidate = false;
      expect(newState).to.be.deep.equal(this.state);
      expect(newState).not.equal(this.state);
    });

    it('should handle RECEIVE_FEATURES', function () {
      var newState = reducer(this.state, {
        type: types.RECEIVE_FEATURES,
        contents: testContents,
        receivedAt: testTime
      });
      this.state.isFetching = false;
      this.state.didInvalidate = false;
      this.state.contents = testContents;
      this.state.lastUpdated = testTime;
      expect(newState).to.be.deep.equal(this.state);
      expect(newState).not.equal(this.state);
    });
  });
});
