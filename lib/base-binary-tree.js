/**
 * @module lib/base-binary-tree
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
   * Creates a base binary tree.
   * @constructor
   */
  var BaseBinaryTree = function () {
    /**
     * The root of the tree.
     * @protected
     */
    this.root = undefined;
  };

  /**
   * Performs a pre-order traversal, calling a function on each node.
   *
   * @param {function} visit A function that takes a node's key.
   */
  BaseBinaryTree.prototype.traversePreOrder = function (visit) {
    if (!this.root) {
      return;
    }

    var parentStack = [];
    parentStack.push(this.root);
    do {
      var top = parentStack.pop();
      visit(top.key);
      if (top.right) {
        parentStack.push(top.right);
      }
      if (top.left) {
        parentStack.push(top.left);
      }
    } while (parentStack.length);
  };

  /**
   * Performs a in-order traversal, calling a function on each node.
   *
   * @param {function} visit A function that takes a node's key.
   */
  BaseBinaryTree.prototype.traverseInOrder = function (visit) {
    var parentStack = [];
    var node = this.root;
    while (parentStack.length || node) {
      if (node) {
        parentStack.push(node);
        node = node.left;
      } else {
        node = parentStack.pop();
        visit(node.key);
        node = node.right;
      }
    }
  };

  /**
   * Performs a post-order traversal, calling a function on each node.
   *
   * @param {function} visit A function that takes a node's key.
   */
  BaseBinaryTree.prototype.traversePostOrder = function (visit) {
    var parentStack = [];
    var node = this.root;
    var lastVisitedNode;
    while (parentStack.length || node) {
      if (node) {
        parentStack.push(node);
        node = node.left;
      } else {
        var nextNode = parentStack[parentStack.length - 1];
        if (nextNode.right && lastVisitedNode !== nextNode.right) {
          // if right child exists AND traversing node from left child, move
          // right
          node = nextNode.right;
        } else {
          parentStack.pop();
          visit(nextNode.key);
          lastVisitedNode = nextNode;
        }
      }
    }
  };

  module.exports = BaseBinaryTree;
});
