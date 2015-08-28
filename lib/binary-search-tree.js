/**
 * @module lib/binary-search-tree
 * @license MIT Copyright 2014 Daniel Imms (http://www.growingwiththeweb.com)
 */
'use strict';

if (typeof exports === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    factory(require, exports, module);
  };
}

define(function (require, exports, module) {
  var BaseBinaryTree = require('./base-binary-tree');
  var BinaryTreeNode = require('./binary-tree-node');

  /**
   * Creates a binary search tree.
   *
   * @constructor
   * @param {function} customCompare An optional custom node comparison
   * function.
   */
  var BinarySearchTree = function (customCompare) {
    BaseBinaryTree.call(this);

    /**
     * The number of nodes in the tree.
     * @private
     */
    this.nodeCount = 0;

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  BinarySearchTree.prototype = Object.create(BaseBinaryTree.prototype);

  BinarySearchTree.prototype.constructor = BinarySearchTree;

  /**
   * Adds a key to the {@link BinarySearchTree}.
   *
   * @param {Object} key The key to add.
   * @return {boolean} Whether the node was added.
   */
  BinarySearchTree.prototype.add = function (key) {
    var newNode = new BinaryTreeNode(key);

    if (!this.root) {
      this.nodeCount++;
      this.root = newNode;
      return true;
    }

    var current = this.root;
    while (true) {
      if (this.compare(key, current.key) < 0) {
        if (!current.left) {
          current.left = newNode;
          this.nodeCount++;
          return true;
        }
        current = current.left;
      } else if (this.compare(key, current.key) > 0) {
        if (!current.right) {
          current.right = newNode;
          this.nodeCount++;
          return true;
        }
        current = current.right;
      } else {
        return false;
      }
    }
  };

  /**
   * Removes a key from the tree.
   *
   * @param {Object} key The key to remove.
   * @return {boolean} Whether the key was removed.
   */
  BinarySearchTree.prototype.remove = function (key) {
    if (!this.root) {
      return false;
    }

    var parent;
    var current = this.root;
    while (true) {
      if (this.compare(key, current.key) < 0) {
        if (!current.left) {
          return false;
        }
        parent = current;
        current = current.left;
      } else if (this.compare(key, current.key) > 0) {
        if (!current.right) {
          return false;
        }
        parent = current;
        current = current.right;
      } else {
        this.nodeCount--;
        deleteNode(current, parent, this);
        return true;
      }
    }
  };

  /**
   * Determines whether the {@link BinarySearchTree} contains a key.
   *
   * @param {Object} key The key to check.
   * @return {boolean} Whether the node contains the key.
   */
  BinarySearchTree.prototype.contains = function (key) {
    if (!this.root) {
      return false;
    }

    var current = this.root;
    while (true) {
      if (this.compare(key, current.key) < 0) {
        if (!current.left) {
          return false;
        }
        current = current.left;
      } else if (this.compare(key, current.key) > 0) {
        if (!current.right) {
          return false;
        }
        current = current.right;
      } else {
        return true;
      }
    }
  };

  /**
   * @return {Object} The maximum key of the tree.
   */
  BinarySearchTree.prototype.findMaximum = function () {
    if (!this.root) {
      return undefined;
    }

    var current = this.root;
    while (true) {
      if (current.right) {
        current = current.right;
      } else {
        return current.key;
      }
    }
  };

  /**
   * @return {Object} The minimum key of the tree.
   */
  BinarySearchTree.prototype.findMinimum = function () {
    if (!this.root) {
      return undefined;
    }

    var current = this.root;
    while (true) {
      if (current.left) {
        current = current.left;
      } else {
        return current.key;
      }
    }
  };

  /**
   * @return {boolean} Whether the tree is empty.
   */
  BinarySearchTree.prototype.isEmpty = function () {
    return !this.root;
  };

  /**
   * @return The size of the tree.
   */
  BinarySearchTree.prototype.size = function () {
    return this.nodeCount;
  };

  /**
   * Compares two nodes with each other.
   *
   * @param {Object} a The first key to compare.
   * @param {Object} b The second key to compare.
   * @return -1, 0 or 1 if a < b, a == b or a > b respectively.
   */
  BinarySearchTree.prototype.compare = function (a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  };

  /**
   * Deletes a node from the tree.
   *
   * @private
   * @param {BinaryTreeNode} node The node being deleted.
   * @param {BinaryTreeNode} parent The parent of the node being deleted.
   * @param {BinaryTreeNode} tree The root of the tree.
   */
  function deleteNode(node, parent, tree) {
    // No children exist, mark this node as deleted
    if (!node.left && !node.right) {
      if (parent) {
        parent.removeChild(node);
      } else {
        tree.root = undefined;
      }
      return;
    }

    // Only the left child exists, move the left node to this position
    if (node.left && !node.right) {
      node.key = node.left.key;
      node.right = node.left.right;
      node.left = node.left.left;
      return;
    }

    // Only the right child exists, move the right node to this position
    if (node.right && !node.left) {
      node.key = node.right.key;
      node.left = node.right.left;
      node.right = node.right.right;
      return;
    }

    // Both children exist, replace this node with with minimum node from the
    // right sub-tree
    var minParent = findParentOfMinimum(node.right, node);
    var minNode = minParent.left ? minParent.left : minParent.right;
    var newKey = minNode.key;
    deleteNode(minNode, minParent, tree);
    node.key = newKey;
  }

  /**
   * Finds the parent of the minimum node.
   *
   * @private
   * @param {BinaryTreeNode} node The node being searched.
   * @param {BinaryTreeNode} parent The parent of the node being searched.
   * @return The parent of the minimum node.
   */
  function findParentOfMinimum(node, parent) {
    if (!node.left) {
      return parent;
    }

    return findParentOfMinimum(node.left, node);
  }

  module.exports = BinarySearchTree;
});
