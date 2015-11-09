/**
 * @module index
 * @license MIT Copyright 2015 Daniel Imms (http://www.growingwiththeweb.com)
 */
'use strict';

if (typeof exports === 'object' && typeof define !== 'function') {
    var define = function (factory) {
        factory(require, exports, module);
    };
}

define(function (require, exports, module) {
  module.exports = {
    BinaryHeap: require('./lib/binary-heap'),
    BinarySearchTree: require('./lib/binary-search-tree'),
    BinomialHeap: require('./lib/binomial-heap'),
    FibonacciHeap: require('@tyriar/fibonacci-heap'),
    RedBlackTree: require('./lib/red-black-tree'),
    SplayTree: require('./lib/splay-tree'),
  };
});
