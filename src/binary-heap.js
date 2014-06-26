// Explanation: http://www.growingwiththeweb.com/2013/01/data-structure-binary-heap.html
//
// Complexity (n=input size):
//   Extract minimum: O(log n)
//   Find minimum:    O(1)
//   Insert:          O(log n)

// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
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

  var BinaryHeap = function (customCompare) {
    this.list = [];

    if (customCompare) {
      this.compare = customCompare;
    }
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
    this.heapify(0);
    return min;
  };

  BinaryHeap.prototype.findMinimum = function () {
    return this.isEmpty() ? undefined : this.list[0];
  };

  BinaryHeap.prototype.heapify = function (i) {
    var l = getLeft(i);
    var r = getRight(i);
    var smallest = i;
    if (l < this.list.length && compare(this.list[l], this.list[i]) < 0) {
      smallest = l;
    }
    if (r < this.list.length && compare(this.list[r], this.list[smallest]) < 0) {
      smallest = r;
    }
    if (smallest != i) {
      swap(this.list, i, smallest);
      this.heapify(smallest);
    }
  };

  BinaryHeap.prototype.insert = function (key) {
    var i = this.list.length;
    this.list.push(key);
    var parent = getParent(i);
    while (parent != i && compare(this.list[i], this.list[parent]) < 0) {
      swap(this.list, i, parent);
      i = parent;
      parent = getParent(i);
    }
  };

  BinaryHeap.prototype.isEmpty = function () {
    return !this.list.length;
  };

  BinaryHeap.prototype.size = function () {
    return this.list.length;
  };

  function swap(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  }

  function compare(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
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

  return BinaryHeap;
}));
