const { assert, expect } = require('chai');

const isParentOf = require('./isParentOf');

// for demonstration I included the useless List class.  It should be removed for real project.
const List = require('./List');

describe('Utilities', function () {

  describe('isParentOf', function () {

    let lst = new List(3),
        Node = lst.first.constructor,
        a = lst.node(0),
        b = lst.node(1),
        c = lst.node(2);

    before(function () {
      a.value = 'A';
      b.value = 'B';
      c.value = 'C';
      expect(a).to.be.equal(lst.first);
      expect(b).to.be.equal(lst.first.next);
      expect(c).to.be.equal(lst.first.next.next);
      expect(lst.first).to.be.equal(c.previous.previous);
    });

    it('is a function', function () {
      assert.isFunction(isParentOf);
    });

    it('can be called directly', function () {
      expect(isParentOf.call(a, c, 'previous')).to.be.true;
      expect(isParentOf.call(c, a, 'previous')).to.be.false;
    });

    it('can be assigned as class mehtod', function () {
      expect(a).to.be.instanceof(Node);
      assert.isUndefined(a.isParentOf);
      Node.prototype.isParentOf = isParentOf;
      assert.isFunction(a.isParentOf)
      expect(a.isParentOf(c, 'previous')).to.be.true;
      expect(c.isParentOf(a, 'previous')).to.be.false;
    });

    it('can be wrapped', function () {
      Node.prototype.isParentOf = function (child) {
        return isParentOf.call(this, child, 'previous');
      }
      expect(a.isParentOf(b)).to.be.true;
      expect(b.isParentOf(c)).to.be.true;
      expect(a.isParentOf(c)).to.be.true;

      expect(a.isParentOf(a)).to.be.false;
      expect(b.isParentOf(b)).to.be.false;
      expect(c.isParentOf(c)).to.be.false;

      expect(c.isParentOf(b)).to.be.false;
      expect(c.isParentOf(a)).to.be.false;
      expect(b.isParentOf(a)).to.be.false;
    });
  });
});
