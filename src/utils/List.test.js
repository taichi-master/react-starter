const { assert, expect } = require('chai');

const List = require('./List');

describe('Linked-List', function () {

  function toArray () {
    var arr = [],
        n = this.first;
    while (n) {
      arr.push(n.value);
      n = n.next;
    }
    return arr;
  }

  function toReverse () {
    var arr = [],
        n;
    if (this.length > 0) {
      n = this.node(this.length-1);
      while (n) {
       arr.push(n.value);
       n = n.previous;
      }
    }
    return arr;
  }

  var lst, arr, Node;

  describe('List class', function () {
    it('can be instantiated', function () {
      lst = new List(3);
      Node = lst.first.constructor;
      expect(lst).to.be.an.instanceof(List);
      expect(lst).to.have.lengthOf(3);
    });
    it('can add new method (function)', function () {
      List.prototype.toArray = toArray;
      List.prototype.toReverse = toReverse;
      assert.isFunction(lst.toArray);
      assert.isFunction(lst.toReverse);
    });
    it('has first properties', function () {
      expect(lst).to.have.property('first');
      assert.isObject(lst.first);
      expect(lst.first).to.be.equal(lst.node(0));
    });
    it('has length properties', function () {
      expect(lst).to.have.property('length');
      expect(lst.length).to.be.a('number');
      expect(lst.length).to.equal(3);
    });
    it('has node(s) method', function () {
      expect(lst).to.respondTo('node');
      for (var i=0; i < lst.length; i++)
        expect(lst.node(i)).to.be.an('object');
    });
  });

  describe('Node', function () {
    it('can be assigned with value', function () {
      lst.node(0).value = 'A';
      lst.node(1).value = 'B';
      lst.node(2).value = 'C';
      // lst.print();
      arr = toArray.call(lst);
      expect(arr).to.have.lengthOf(3);
      expect(arr.join(',')).to.equal('A,B,C');
      expect(arr.reverse().join(',')).to.equal(lst.toReverse().join(','));
    });

    it('can be added', function () {
      lst.add('D');
      // lst.print();
      expect(lst).to.respondTo('add');
      arr = lst.toArray();
      expect(arr).to.have.lengthOf(4);
      expect(arr.join(',')).to.equal('A,B,C,D');
      expect(arr.reverse().join(',')).to.equal(lst.toReverse().join(','));
    });

    it('can be inserted', function () {
      lst.insert('**i', 1);
      // lst.print();
      expect(lst).to.respondTo('insert');
      arr = lst.toArray();
      expect(arr).to.have.lengthOf(5);
      expect(arr.join(',')).to.equal('A,**i,B,C,D');
      expect(arr.reverse().join(',')).to.equal(lst.toReverse().join(','));
    });

    it('can be inserted from scratch', function () {
      lst2 = new List();
      lst2.insert('D');
      lst2.insert('C');
      lst2.insert('B');
      lst2.insert('**i');
      lst2.insert('A');
      arr = lst2.toArray();
      expect(arr.join(',')).to.equal('A,**i,B,C,D');
      expect(arr.reverse().join(',')).to.equal(lst2.toReverse().join(','));
      expect(lst.toReverse().join(',')).to.equal(lst2.toReverse().join(','));
    });

    it('can be removed', function () {
      lst.remove(1);
      // lst.print();
      expect(lst).to.respondTo('remove');
      arr = lst.toArray();
      expect(arr).to.have.lengthOf(4);
      expect(arr.join(',')).to.equal('A,B,C,D');
      expect(arr.reverse().join(',')).to.equal(lst.toReverse().join(','));

      lst.remove(3);
      // lst.print();
      arr = lst.toArray();
      expect(arr).to.have.lengthOf(3);
      expect(arr.join(',')).to.equal('A,B,C');
      expect(arr.reverse().join(',')).to.equal(lst.toReverse().join(','));

      lst.insert('**j', 0);
      // lst.print();
      arr = lst.toArray();
      expect(arr).to.have.lengthOf(4);
      expect(arr.join(',')).to.equal('**j,A,B,C');
      expect(arr.reverse().join(',')).to.equal(lst.toReverse().join(','));

      lst.remove(0);
      // lst.print();
      arr = lst.toArray();
      expect(arr).to.have.lengthOf(3);
      expect(arr.join(',')).to.equal('A,B,C');
      expect(arr.reverse().join(',')).to.equal(lst.toReverse().join(','));
    });
  });
});
