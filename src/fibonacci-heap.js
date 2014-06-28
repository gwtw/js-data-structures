// Explanation: http://www.growingwiththeweb.com/2014/01/binomial-heap.html
//
// Complexity (n=input size):
//   clear:          O(1)
//   findMinimum:    O(1)
//   isEmpty:        O(1)

// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.FibonacciHeap = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.FibonacciHeap = factory();
  }
}(this, function () {
  'use strict';

  var FibonacciHeap = function (customCompare) {
    this.minNode = undefined;
    this.nodeCount = 0;

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  FibonacciHeap.prototype.clear = function () {
    minNode = undefined;
    nodeCount = 0;
  };

  //FibonacciHeap.prototype.decreaseKey = function (node, newKey) {
  //};

  //FibonacciHeap.prototype.delete = function (node) {
  //};

  //FibonacciHeap.prototype.extractMinimum = function () {
  //};

  FibonacciHeap.prototype.findMinimum = function () {
    return minNode;
  };

  FibonacciHeap.prototype.insert = function (key, value) {
    var node = new Node(key, value);
    minNode = mergeLists(minNode, node);
    nodeCount++;
    return node;
  };

  FibonacciHeap.prototype.isEmpty = function () {
    return minNode === undefined;
  };

  //FibonacciHeap.prototype.size = function () {
  //};

  //FibonacciHeap.prototype.union = function (heap) {
  //};

  FibonacciHeap.prototype.compare = function (a, b) {
    if (a.key > b.key) {
      return 1;
    }
    if (a.key < b.key) {
      return -1;
    }
    return 0;
  };

  // Merges two lists and returns the minimum node
  function mergeLists()

  function Node(key, value) {
    this.key = key;
    this.value = value;
    this.degree = undefined;
    this.parent = undefined;
    this.child = undefined;
    this.prev = undefined;
    this.next = undefined;
    this.isMarked = undefined;
    this.isMinimum = undefined;
  }

  return FibonacciHeap;
}));
