/**
 * @module lib/red-black-tree
 * @license MIT Copyright 2015 Daniel Imms (http://www.growingwiththeweb.com)
 */
'use strict';

if (typeof exports === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    factory(require, exports, module);
  };
}

define(function (require, exports, module) {
  var BaseBinaryTree = require('./base-binary-tree');
  var RedBlackTreeNode = require('./red-black-tree-node');

  /**
   * Creates a red-black tree.
   *
   * @constructor
   * @param {function} customCompare An optional custom node comparison
   * function.
   */
  var RedBlackTree = function (customCompare) {
    BaseBinaryTree.call(this);

    this.root = undefined;

    /**
     * The number of nodes in the tree.
     * @private
     */
    this.nodeCount = 0;

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  RedBlackTree.prototype = Object.create(BaseBinaryTree.prototype);

  RedBlackTree.prototype.constructor = RedBlackTree;

  /**
   * Adds a key to the {@link BinarySearchTree}.
   *
   * @param {Object} key The key to add.
   * @return {boolean} Whether the node was added.
   */
  RedBlackTree.prototype.add = function (key) {
    var parent;
    var node = this.root;
    while (node && !node.isNilNode()) {
      parent = node;
      var compare = this.compare(key, parent.key);
      if (compare === 0) {
        return false;
      }
      if (compare < 0) {
        node = parent.getLeft();
      } else {
        node = parent.getRight();
      }
    }
    if (!parent) {
      node = new RedBlackTreeNode(key);
      this.root = node;
    } else {
      node.parent = parent;
      node.key = key;
    }
    node.color = 'red';
    this.insertFixup(node);
    this.nodeCount++;
    return true;
  };

  RedBlackTree.prototype.insertFixup = function (node) {
    while (node.parent && node.parent.parent && node.parent.color === 'red') {
      var uncle;
      if (node.parent === node.parent.parent.getLeft()) {
        uncle = node.parent.parent.getRight();
        if (uncle.color === 'red') {
          node.parent.color = 'black';
          uncle.color = 'black';
          node = node.parent.parent;
          node.color = 'red';
        } else {
          if (node === node.parent.getRight()) {
            node = node.parent;
            this.rotateLeft(node);
          }
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          this.rotateRight(node.parent.parent);
        }
      } else if (node.parent === node.parent.parent.getRight()) {
        uncle = node.parent.parent.getLeft();
        if (uncle.color === 'red') {
          node.parent.parent.color = 'black';
          uncle.color = 'black';
          node = node.parent.parent;
          node.color = 'red';
        } else {
          if (node === node.parent.getLeft()) {
            node = node.parent;
            this.rotateRight(node);
          }
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          this.rotateLeft(node.parent.parent);
        }
      }
    }
    this.root.color = 'black';
  };

  /**
   * Determines whether the tree contains a key.
   *
   * @param {Object} key The key to check.
   * @return {boolean} Whether the node contains the key.
   */
  RedBlackTree.prototype.contains = function (key) {
    return !!this.search(key);
  };

  /**
   * Finds the element matching a key.
   *
   * @param {Object} key The key to check.
   * @return {RedBlackTreeNode} The matching node.
   */
  RedBlackTree.prototype.search = function (key) {
    if (!this.root) {
      return undefined;
    }

    var current = this.root;
    while (true) {
      if (this.compare(key, current.key) < 0) {
        if (typeof current.getLeft().key === 'undefined') {
          return undefined;
        }
        current = current.getLeft();
      } else if (this.compare(key, current.key) > 0) {
        if (typeof current.getRight().key === 'undefined') {
          return undefined;
        }
        current = current.getRight();
      } else {
        return current;
      }
    }
  };

  /**
   * Removes a key from the tree.
   *
   * @param {Object} key The key to remove.
   * @return {boolean} Whether the key was removed.
   */
  RedBlackTree.prototype.remove = function (key) {
    var node = this.search(key);
    if (!node) {
      return false;
    }
    this.nodeCount--;
    var y;
    var x;
    if (node.getLeft().isNilNode() || node.getRight().isNilNode()) {
      y = node;
    } else {
      y = this.treeSuccessor(node);
    }
    if (!y.getLeft().isNilNode()) {
      x = y.getLeft();
    } else {
      x = y.getRight();
    }
    x.parent = y.parent;
    if (!y.parent) {
      this.root = x;
    } else {
      if (y === y.parent.getLeft()) {
        y.parent.left = x;
      } else {
        y.parent.right = x;
      }
    }
    if (y !== node) {
      node.key = y.key;
    }
    if (y.color === 'black') {
      this.deleteFixup(x);
    }
    return true;
  };

  RedBlackTree.prototype.deleteFixup = function (node) {
    while (node !== this.root && node.color === 'black') {
      var w;
      if (node === node.parent.getLeft()) {
        w = node.parent.getRight();
        if (w.color === 'red') {
          w.color = 'black';
          node.parent.color = 'red';
          this.rotateLeft(node.parent);
        }
        if (w.getLeft().color === 'black' && w.getRight().color === 'black') {

          w.color = 'red';
          node = node.parent;
        } else {
          if (w.getRight().color === 'black') {
            w.getLeft().color = 'black';
            w.color = 'red';
            this.rotateRight(w);
            w = node.parent.getRight();
          }
          w.color = node.parent.color;
          node.parent.color = 'black';
          w.getRight().color = 'black';
          this.rotateLeft(node.parent);
          node = this.root;
        }
      } else {
        w = node.parent.getLeft();
        if (w.color === 'red') {
          w.color = 'black';
          node.parent.color = 'red';
          this.rotateRight(node.parent);
        }
        if (w.getRight().color === 'black' && w.getLeft().color === 'black') {
          w.color = 'red';
          node = node.parent;
        } else {
          if (w.getLeft().color === 'black') {
            w.getRight().color = 'black';
            w.color = 'red';
            this.rotateLeft(w);
            w = node.parent.getLeft();
          }
          w.color = node.parent.color;
          node.parent.color = 'black';
          w.getLeft().color = 'black';
          this.rotateRight(node.parent);
          node = this.root;
        }
      }
    }
    node.color = 'black';
  };

  RedBlackTree.prototype.treeSuccessor = function (node) {
    if (node.getRight() && !node.isNilNode()) {
      return this.treeMinimum(node.getRight());
    }
    var successor = node.parent;
    while (successor && !successor.isNilNode() && node === successor) {
      node = successor;
      successor = node.parent;
    }
    return successor;
  };

  /**
   * @return {Object} Gets the minimum node in a sub-tree.
   */
  RedBlackTree.prototype.treeMinimum = function (node) {
    while (!node.isNilNode() && !node.getLeft().isNilNode()) {
      node = node.getLeft();
    }
    return node;
  };

  /**
   * Rotates a node in a tree left.
   *
   *     a                             b
   *    / \                           / \
   *   c   b   -> rotateLeft(a) ->   a   e
   *      / \                       / \
   *     d   e                     c   d
   *
   * @param {BinaryTreeNode} x The node being rotated.
   */
  RedBlackTree.prototype.rotateLeft = function (x) {
    var y = x.getRight();
    x.right = y.getLeft();
    if (typeof y.getLeft().key !== 'undefined') {
      y.getLeft().parent = x;
    }
    y.parent = x.parent;
    if (!x.parent) {
      this.root = y;
    } else {
      if (x === x.parent.getLeft()) {
        x.parent.left = y;
      } else {
        x.parent.right = y;
      }
    }
    y.left = x;
    x.parent = y;
  };

  /**
   * Rotates a node in a tree right.
   *
   *       b                          a
   *      / \                        / \
   *     a   e -> rotateRight(b) -> c   b
   *    / \                            / \
   *   c   d                          d   e
   *
   * @param {BinaryTreeNode} x The node being rotated.
   */
  RedBlackTree.prototype.rotateRight = function (x) {
    var y = x.getLeft();
    x.left = y.getRight();
    if (typeof y.getRight().key !== 'undefined') {
      y.getRight().parent = x;
    }
    y.parent = x.parent;
    if (!x.parent) {
      this.root = y;
    } else {
      if (x === x.parent.getLeft()) {
        x.parent.left = y;
      } else {
        x.parent.right = y;
      }
    }
    y.right = x;
    x.parent = y;
  };

  /**
   * @return {Object} The maximum key of the tree.
   */
  RedBlackTree.prototype.findMaximum = function () {
    if (!this.root) {
      return undefined;
    }

    var current = this.root;
    while (true) {
      if (typeof current.getRight().key !== 'undefined') {
        current = current.getRight();
      } else {
        return current.key;
      }
    }
  };

  /**
   * @return {Object} The minimum key of the tree.
   */
  RedBlackTree.prototype.findMinimum = function () {
    if (!this.root) {
      return undefined;
    }

    var current = this.root;
    while (true) {
      if (typeof current.getLeft().key !== 'undefined') {
        current = current.getLeft();
      } else {
        return current.key;
      }
    }
  };

  /**
   * @return {boolean} Whether the tree is empty.
   */
  RedBlackTree.prototype.isEmpty = function () {
    return !this.nodeCount;
  };

  /**
   * @return The size of the tree.
   */
  RedBlackTree.prototype.size = function () {
    return this.nodeCount;
  };

  /**
   * Compares two nodes with each other.
   *
   * @param {Object} a The first key to compare.
   * @param {Object} b The second key to compare.
   * @return -1, 0 or 1 if a < b, a == b or a > b respectively.
   */
  RedBlackTree.prototype.compare = function (a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  };

  module.exports = RedBlackTree;
});
