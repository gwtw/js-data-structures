// Explanation: http://www.growingwiththeweb.com/2013/01/data-structure-binary-heap.html
//
// Complexity (n=input size):
//   buildHeap:      Θ(n)
//   clear:          Θ(1)
//   decreaseKey:    Θ(log n)
//   delete:         Θ(log n)
//   extractMinimum: Θ(log n)
//   findMinimum:    Θ(1)
//   insert:         Θ(log n)
//   isEmpty:        Θ(1)
//   size:           Θ(1)
//   union:          Θ(n)

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.BinaryHeap = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.BinaryHeap = factory();
  }
}(this, function () {
  'use strict';

  // Creates a new binary heap with an optional customCompare.
  var BinaryHeap = function (customCompare) {
    this.list = [];

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  // Builds a heap with the provided key and value arrays, note that this
  // completely discards the old heap.
  BinaryHeap.prototype.buildHeap = function (keyArray, valueArray) {
    if (keyArray.length !== valueArray.length) {
      throw "Key array must be the same length as value array";
    }

    var nodeArray = [];

    for (var i = 0; i < keyArray.length; i++) {
      nodeArray.push(new Node(keyArray[i], valueArray[i], i));
    }

    buildHeapFromNodeArray(this, nodeArray);
  };

  BinaryHeap.prototype.clear = function () {
    this.list.length = 0;
  };

  BinaryHeap.prototype.decreaseKey = function (node, newKey) {
    if (typeof node === 'undefined') {
      throw "Cannot decrease key of non-existant node";
    }
    // Create a temp node for comparison
    if (this.compare(new Node(newKey, undefined), node.key) > 0) {
      throw "New key is larger than old key";
    }

    node.key = newKey;
    var parent = getParent(node.i);
    while (this.compare(node, this.list[parent]) < 0) {
      swap(this.list, node.i, parent);
      parent = getParent(node.i);
    }
  };

  BinaryHeap.prototype.delete = function (node) {
    // Bubble up to the root and extract
    while (node.i > 0) {
      var parent = getParent(node.i);
      swap(this.list, node.i, parent);
    }
    this.extractMinimum();
  };

  BinaryHeap.prototype.extractMinimum = function () {
    if (!this.list.length) {
      return undefined;
    }
    if (this.list.length === 1) {
      return this.list.shift();
    }
    var min = this.list[0];
    this.list[0] = this.list.pop();
    this.list[0].i = 0;
    heapify(this, 0);
    return min;
  };

  BinaryHeap.prototype.findMinimum = function () {
    return this.isEmpty() ? undefined : this.list[0];
  };

  BinaryHeap.prototype.insert = function (key, value) {
    var i = this.list.length;
    var node = new Node(key, value, i);
    this.list.push(node);
    var parent = getParent(i);
    while (parent !== i && this.compare(this.list[i], this.list[parent]) < 0) {
      swap(this.list, i, parent);
      i = parent;
      parent = getParent(i);
    }
    return node;
  };

  BinaryHeap.prototype.isEmpty = function () {
    return !this.list.length;
  };

  BinaryHeap.prototype.size = function () {
    return this.list.length;
  };

  BinaryHeap.prototype.union = function (otherHeap) {
    var array = this.list.concat(otherHeap.list);
    buildHeapFromNodeArray(this, array);
  };

  BinaryHeap.prototype.compare = function (a, b) {
    if (a.key > b.key) {
      return 1;
    }
    if (a.key < b.key) {
      return -1;
    }
    return 0;
  };

  function heapify(heap, i) {
    var l = getLeft(i);
    var r = getRight(i);
    var smallest = i;
    if (l < heap.list.length && heap.compare(heap.list[l], heap.list[i]) < 0) {
      smallest = l;
    }
    if (r < heap.list.length && heap.compare(heap.list[r], heap.list[smallest]) < 0) {
      smallest = r;
    }
    if (smallest !== i) {
      swap(heap.list, i, smallest);
      heapify(heap, smallest);
    }
  }

  // Builds a heap with the provided node array, note that this completely
  // discards the old heap.
  function buildHeapFromNodeArray(heap, nodeArray) {
    heap.list = nodeArray;
    for (var i = Math.floor(heap.list.length / 2); i >= 0; i--) {
      heapify(heap, i);
    }
  }

  function swap(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    array[a].i = a;
    array[b].i = b;
  }

  function getParent(i) {
    return Math.floor(i / 2);
  }

  function getLeft(i) {
    return 2 * i;
  }

  function getRight(i) {
    return 2 * i + 1;
  }

  function Node(key, value, i) {
    this.key = key;
    this.value = value;
    this.i = i; // index needs to be tracked for decreaseKey and delete
  }

  return BinaryHeap;
}));
