// Linked-List implementation demonstration
// by: Kei Sing Wong

function Node (value, next=null) {
  this.previous = null;
  this.value = value;
  this.next = next;
}

function List (n=0, defVal) {
  this.first = null;
  var node = null,
      previous = null;
  if (n > 0) {
    this.first = node = new Node(defVal);
    for (var i=1; i < n; i++) {
      previous = node;
      node = node.next = new Node(defVal);
      node.previous = previous;
    }
  }
  this.length = n;
}

List.prototype.node = function node (position) {
  var node = this.first;
  for (var i=0; i < position; i++)
    node = node.next;
  return node;
}

List.prototype.add = function add (value) {
  var newNode = new Node(value);
  if (this.length > 0) {
    node = this.node(this.length-1);
    node.next = newNode;
    newNode.previous = node;
  } else
    this.first = newNode;
  this.length++;
  return this;
}

List.prototype.insert = function insert (value, position=0) {
  var node, temp;
  if (position === 0) {
    temp = this.first;
    node = this.first = new Node(value, this.first)
  } else {
    node = this.node(position-1);
    temp = node.next;
    node = node.next = new Node(value, node.next);
  }
  if (temp) {
    node.previous = temp.previous;
    temp.previous = node;
  }
  this.length++;
  return this;
}

List.prototype.remove = function remove (position) {
  var node0, node1, node2;
  if (position === 0) {
    node1 = this.first;
    this.first = node1.next;
    this.first.previous = null;
  } else {
    node0 = this.node(position-1),
    node1 = node0.next,
    node2 = node1.next;
    if (node2)
      node2.previous = node0;
    node0.next = node2;
  }
  delete node1;
  this.length--;
  return this;
}

List.prototype.print = function print () {
  var node = this.first,
      i = 0;
  console.log('');
  while (node) {
    console.log(i++, node.value);
    node = node.next;
  }
}

module.exports = List;
