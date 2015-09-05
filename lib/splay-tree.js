/**
 * @module lib/splay-tree
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
   * Creates a splay tree.
   *
   * @constructor
   * @param {function} customCompare An optional custom node comparison
   * function.
   */
  var SplayTree = function (customCompare) {
    BaseBinaryTree.call(this);

    this.nodeCount = 0;

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  SplayTree.prototype = Object.create(BaseBinaryTree.prototype);

  SplayTree.prototype.constructor = SplayTree;

  /**
   * Adds a key to the tree.
   *
   * @param {Object} key The key to add.
   * @return {boolean} Whether the node was added.
   */
  SplayTree.prototype.add = function (key) {
    if (!this.root) {
      this.root = new BinaryTreeNode(key);
      this.nodeCount++;
      return true;
    }

    var wasAdded = insertInternal(this, key, this.root);
    this.contains(key);
    return wasAdded;
  };

  /**
   * Determines whether the tree contains a key.
   *
   * @param {Object} key The key to check.
   * @return {boolean} Whether the node contains the key.
   */
  SplayTree.prototype.contains = function (key) {
    if (!this.root) {
      return false;
    }

    var node = containsInternal(this, key, this.root);
    if (node) {
      splay(this, node);
    }
    return !!node;
  };

  /**
   * @return {Object} The maximum key of the tree.
   */
  SplayTree.prototype.findMaximum = function () {
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
  SplayTree.prototype.findMinimum = function () {
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
  SplayTree.prototype.isEmpty = function () {
    return !this.root;
  };

  /**
   * Removes a key from the tree.
   *
   * @param {Object} key The key to remove.
   * @return {boolean} Whether the key was removed.
   */
  SplayTree.prototype.remove = function (key) {
    if (!this.root) {
      return false;
    }

    this.contains(key);
    return removeInternal(this, key, this.root);
  };

  /**
   * @return The size of the tree.
   */
  SplayTree.prototype.size = function () {
    return this.nodeCount;
  };

  /**
   * Compares two nodes with each other.
   *
   * @param {Object} a The first key to compare.
   * @param {Object} b The second key to compare.
   * @return -1, 0 or 1 if a < b, a == b or a > b respectively.
   */
  SplayTree.prototype.compare = function (a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
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
   * @param {SplayTree} tree The splay tree.
   * @param {BinaryTreeNode} x The node being rotated.
   */
  function rotateLeft(tree, x) {
    var y = x.right;
    x.right = y.left;
    if (y.left) {
      y.left.parent = x;
    }
    y.parent = x.parent;
    if (!x.parent) {
      tree.root = y;
    } else {
      if (x === x.parent.left) {
        x.parent.left = y;
      } else {
        x.parent.right = y;
      }
    }
    y.left = x;
    x.parent = y;
  }

  /**
   * Rotates a node in a tree right.
   *
   *       b                          a
   *      / \                        / \
   *     a   e -> rotateRight(b) -> c   b
   *    / \                            / \
   *   c   d                          d   e
   *
   * @param {SplayTree} tree The splay tree.
   * @param {BinaryTreeNode} x The node being rotated.
   */
  function rotateRight(tree, x) {
    var y = x.left;
    x.left = y.right;
    if (y.right) {
      y.right.parent = x;
    }
    y.parent = x.parent;
    if (!x.parent) {
      tree.root = y;
    } else {
      if (x === x.parent.left) {
        x.parent.left = y;
      } else {
        x.parent.right = y;
      }
    }
    y.right = x;
    x.parent = y;
  }

  /**
   * Inserts a key into the tree rooted on a particular node.
   *
   * @param {SplayTree} tree The tree to insert into.
   * @param {Object} key The key to insert.
   * @param {BinaryTreeNode} mode The tree's node to insert until.
   */
  function insertInternal(tree, key, node) {
    if (tree.compare(key, node.key) < 0) {
      if (node.left) {
        return insertInternal(tree, key, node.left);
      } else {
        node.left = new BinaryTreeNode(key, node);
        tree.nodeCount++;
        return true;
      }
    }

    if (tree.compare(key, node.key) > 0) {
      if (node.right) {
        return insertInternal(tree, key, node.right);
      } else {
        node.right = new BinaryTreeNode(key, node);
        tree.nodeCount++;
        return true;
      }
    }

    return false;
  }

  function containsInternal(tree, key, node) {
    if (key === node.key) {
      return node;
    }

    if (tree.compare(key, node.key) < 0) {
      if (!node.left) {
        return undefined;
      }
      return containsInternal(tree, key, node.left);
    }

    if (tree.compare(key, node.key) > 0) {
      if (!node.right) {
        return undefined;
      }
      return containsInternal(tree, key, node.right);
    }

    return undefined;
  }

  function removeInternal(tree, key, node) {
    if (tree.compare(key, node.key) < 0) {
      if (node.left) {
        return removeInternal(tree, key, node.left);
      }
      return false;
    }

    if (tree.compare(key, node.key) > 0) {
      if (node.right) {
        return removeInternal(tree, key, node.right);
      }
      return false;
    }

    return removeInternal2(tree, node);
  }

  function removeInternal2(tree, node) {
    if (!node.left && !node.right) {
      removeNodeWithNoChildren(tree, node);
      return true;
    }

    if (node.left && !node.right) {
      removeNodeWithLeftOnly(tree, node);
      return true;
    }

    if (node.right && !node.left) {
      removeNodeWithRightOnly(tree, node);
      return true;
    }

    // both exist, replace with node minimum from right sub-tree and delete the
    // node from the right sub-tree
    var minParent = findParentOfMinimum(node.right, node);
    var minNode = minParent.left ? minParent.left : minParent.right;
    var newKey = minNode.key;
    removeInternal2(tree, minNode);
    node.key = newKey;

    return true;
  }

  /**
   * Removes a node with no children.
   *
   * @param {SplayTree} tree The tree to remove the node from.
   * @param {BinaryTreeNode} node The node to remove.
   */
  function removeNodeWithNoChildren(tree, node) {
    if (node.parent) {
      node.parent.removeChild(node);
    } else {
      tree.root = undefined;
    }
    tree.nodeCount--;
  }

  /**
   * Removes a node with a left child only, moving the left child in to the
   * node's place.
   *
   * @param {SplayTree} tree The tree to remove the node from.
   * @param {BinaryTreeNode} node The node to remove.
   */
  function removeNodeWithLeftOnly(tree, node) {
    node.key = node.left.key;
    node.right = node.left.right;
    if (node.right) {
      node.right.parent = node;
    }
    node.left = node.left.left;
    if (node.left) {
      node.left.parent = node;
    }
    tree.nodeCount--;
  }

  /**
   * Removes a node with a right child only, moving the right child in to the
   * node's place.
   *
   * @param {SplayTree} tree The tree to remove the node from.
   * @param {BinaryTreeNode} node The node to remove.
   */
  function removeNodeWithRightOnly(tree, node) {
    node.key = node.right.key;
    node.left = node.right.left;
    if (node.left) {
      node.left.parent = node;
    }
    node.right = node.right.right;
    if (node.right) {
      node.right.parent = node;
    }
    tree.nodeCount--;
  }

  /**
   * Splay the tree on a node, bringing it to the root using a series of
   * rotation operations.
   *
   * @param {SplayTree} tree The tree being splayed.
   * @param {BinaryTreeNode} node The node being splayed on.
   */
  function splay(tree, node) {
    while (node.parent) {
      var parent = node.parent;
      if (!parent.parent) {
        if (parent.left === node) {
          rotateRight(tree, parent);
        } else {
          rotateLeft(tree, parent);
        }
      } else {
        var gparent = parent.parent;
        if (parent.left === node && gparent.left === parent) {
          rotateRight(tree, gparent);
          rotateRight(tree, node.parent);
        } else if (parent.right === node && gparent.right === parent) {
          rotateLeft(tree, gparent);
          rotateLeft(tree, node.parent);
        } else if (parent.left === node && gparent.right === parent) {
          rotateRight(tree, parent);
          rotateLeft(tree, node.parent);
        } else {
          rotateLeft(tree, parent);
          rotateRight(tree, node.parent);
        }
      }
    }
  }

  /**
   * @return {BinaryTreeNode} The parent of the minimum key node in the tree.
   */
  function findParentOfMinimum(node, parent) {
    if (!node.left) {
      return parent;
    }

    return findParentOfMinimum(node.left, node);
  }

  module.exports = SplayTree;
});
