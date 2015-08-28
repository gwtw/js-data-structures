/**
 * @module lib/red-black-tree-node
 * @license MIT Copyright 2015 Daniel Imms (http://www.growingwiththeweb.com)
 */
'use strict';

if (typeof exports === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    factory(require, exports, module);
  };
}

define(function (require, exports, module) {
  var BinaryTreeNode = require('./binary-tree-node');

  /**
   * Creates a red-black tree node.
   *
   * @constructor
   * @param {Object} key The key of the node. If this is undefined the node will
   * be marked as a nil (black) node.
   * @param {RedBlackTreeNode} parent The parent of the node.
   */
  var RedBlackTreeNode = function (key, parent) {
    BinaryTreeNode.call(this, key, parent);

    /**
     * The color of the node.
     * @public
     */
    this.color = typeof key === 'undefined' ? 'black' : 'red';
  };

  RedBlackTreeNode.prototype = Object.create(BinaryTreeNode.prototype);

  RedBlackTreeNode.prototype.constructor = RedBlackTreeNode;

  /**
   * Gets the left child of the node, creating it as a nil (black) node if it
   * didn't exist.
   *
   * @return {RedBlackTreeNode} The left child of the node.
   */
  RedBlackTreeNode.prototype.getLeft = function () {
    if (!this.left) {
      this.left = new RedBlackTreeNode(undefined, this);
    }
    return this.left;
  };

  /**
   * Gets the right child of the node, creating it as a nil (black) node if it
   * didn't exist.
   *
   * @return {RedBlackTreeNode} The right child of the node.
   */
  RedBlackTreeNode.prototype.getRight = function () {
    if (!this.right) {
      this.right = new RedBlackTreeNode(undefined, this);
    }
    return this.right;
  };

  /**
   * @return Whether the node is a nil (black) node.
   */
  RedBlackTreeNode.prototype.isNilNode = function () {
    return typeof this.key === 'undefined';
  };

  module.exports = RedBlackTreeNode;
});
