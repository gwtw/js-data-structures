/**
 * @module lib/binary-tree-node
 * @license MIT Copyright 2014 Daniel Imms (http://www.growingwiththeweb.com)
 */
'use strict';

if (typeof exports === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    factory(require, exports, module);
  };
}

define(function (require, exports, module) {
  /**
   * Creates a binary tree node.
   *
   * @constructor
   * @param {Object} key The key of the node.
   * @param {BinaryTreeNode} parent The parent of the node.
   */
  function BinaryTreeNode(key, parent) {
    /**
     * The key of the node.
     * @public
     */
    this.key = key;

    /**
     * The parent of the node.
     * @public
     */
    this.parent = parent;

    /**
     * The left child of the node.
     * @public
     */
    this.left = undefined;

    /**
     * The right child of the node.
     * @public
     */
    this.right = undefined;
  }

  /**
   * Removes a child from the node. This will remove the left or right node
   * depending on which one matches the argument.
   *
   * @param {Object} node The node to remove.
   */
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
