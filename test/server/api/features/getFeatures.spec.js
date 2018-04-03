const { assert, expect } = require('chai');

const getFeatures = require('server/api/features/getFeatures');

describe('Server', function () {
  describe('REST API Libraries', function () {

    describe('getFeatures', function () {
  
      it('is a function', function () {
        assert.isFunction(getFeatures);
      });
  
      it('can return features from callback', function (done) {
        getFeatures((err, features) => {
          if (err)
            return;
  
          assert.isArray(features);
          expect(features).to.have.length.of.at.least(10);
          expect(features).to.be.include('REST API');
          done();
        });
      });
    });
  });
});
