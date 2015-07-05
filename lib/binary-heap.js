/**
 * @license
 * js-data-structures <http://github.com/Tyriar/js-data-structures>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/js-data-structures/blob/master/LICENSE>
 */
'use strict';

if (typeof exports === 'object' && typeof define !== 'function') {
    var define = function (factory) {
        factory(require, exports, module);
    };
}

define(function (require, exports, module) {
  /**
   * Creates a binary heap.
   *
   * @constructor
   * @param {function} customCompare An optional custom node comparison
   * function.
   */
  var BinaryHeap = function (customCompare) {
    this.list = [];

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  /**
   * Builds a heap with the provided keys and values, this will discard the
   * heap's current data.
   *
   * @param {Array} keys An array of keys.
   * @param {Array} values An array of values. This must be the same size as the
   * key array.
   */
  BinaryHeap.prototype.buildHeap = function (keys, values) {
    if (keys.length !== values.length) {
      throw 'Key array must be the same length as value array';
    }

    var nodeArray = [];

    for (var i = 0; i < keys.length; i++) {
      nodeArray.push(new Node(keys[i], values[i], i));
    }

    buildHeapFromNodeArray(this, nodeArray);
  };

  /**
   * Clears the heap's data, making it an empty heap.
   */
  BinaryHeap.prototype.clear = function () {
    this.list.length = 0;
  };

  /**
   * Decreases the key of a node.
   *
   * @param {Node} node The node to decrease.
   * @param {Object} newKey The new key.
   */
  BinaryHeap.prototype.decreaseKey = function (node, newKey) {
    if (typeof node === 'undefined') {
      throw 'Cannot decrease key of non-existent node';
    }
    // Create a temp node for comparison
    if (this.compare({ key: newKey }, { key: node.key }) > 0) {
      throw 'New key is larger than old key';
    }

    node.key = newKey;
    var parent = getParent(node.i);
    while (this.compare(node, this.list[parent]) < 0) {
      swap(this.list, node.i, parent);
      parent = getParent(node.i);
    }
  };

  /**
   * Removes a node from the heap.
   *
   * @param {Node} node The node to remove.
   */
  BinaryHeap.prototype.delete = function (node) {
    // Bubble up to the root and extract
    while (node.i > 0) {
      var parent = getParent(node.i);
      swap(this.list, node.i, parent);
    }
    this.extractMinimum();
  };

  /**
   * Extracts and returns the minimum node from the heap.
   *
   * @return {Node} node The heap's minimum node or undefined if the heap is
   * empty.
   */
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

  /**
   * Returns the minimum node from the heap.
   *
   * @return {Node} node The heap's minimum node or undefined if the heap is
   * empty.
   */
  BinaryHeap.prototype.findMinimum = function () {
    return this.isEmpty() ? undefined : this.list[0];
  };

  /**
   * Inserts a new key-value pair into the heap.
   *
   * @param {Object} key The key to insert.
   * @param {Object} value The value to insert.
   * @return {Node} node The inserted node.
   */
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

  /**
   * @return {boolean} Whether the heap is empty.
   */
  BinaryHeap.prototype.isEmpty = function () {
    return !this.list.length;
  };

  /**
   * @return {number} The size of the heap.
   */
  BinaryHeap.prototype.size = function () {
    return this.list.length;
  };

  /**
   * Joins another heap to this one.
   * 
   * @param {BinaryHeap} otherHeap The other heap.
   */
  BinaryHeap.prototype.union = function (otherHeap) {
    var array = this.list.concat(otherHeap.list);
    buildHeapFromNodeArray(this, array);
  };

  /**
   * Compares two nodes with each other.
   *
   * @param {Object} a The first key to compare.
   * @param {Object} b The second key to compare.
   * @return -1, 0 or 1 if a < b, a == b or a > b respectively.
   */
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
    if (l < heap.list.length &&
        heap.compare(heap.list[l], heap.list[i]) < 0) {
      smallest = l;
    }
    if (r < heap.list.length &&
        heap.compare(heap.list[r], heap.list[smallest]) < 0) {
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

  module.exports = BinaryHeap;
});
