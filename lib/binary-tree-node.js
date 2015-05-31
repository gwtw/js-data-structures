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
  function BinaryTreeNode(key, parent) {
    this.key = key;
    this.parent = parent;
    this.left = undefined;
    this.right = undefined;
  }

  BinaryTreeNode.prototype.removeChild = function (node) {
    if (this.left === node) {
      this.left = undefined;
    }
    if (this.right === node) {
      this.right = undefined;
    }
  };

  module.exports = BinaryTreeNode;
});
