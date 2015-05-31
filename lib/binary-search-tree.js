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
  var BaseBinaryTree = require('./base-binary-tree');
  var BinaryTreeNode = require('./binary-tree-node');

  var BinarySearchTree = function (customCompare) {
    this.root = undefined;
    this.nodeCount = 0;

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  BinarySearchTree.prototype = Object.create(BaseBinaryTree.prototype);

  BinarySearchTree.prototype.constructor = BinarySearchTree;

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

  BinarySearchTree.prototype.isEmpty = function () {
    return !this.root;
  };

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

  BinarySearchTree.prototype.size = function () {
    return this.nodeCount;
  };



  BinarySearchTree.prototype.compare = function (a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  };

  function deleteNode(node, parent, tree) {
    if (!node.left && !node.right) {
      if (parent) {
        parent.removeChild(node);
      } else {
        tree.root = undefined;
      }
      return;
    }

    if (node.left && !node.right) {
      node.key = node.left.key;
      node.right = node.left.right;
      node.left = node.left.left;
      return;
    }

    if (node.right && !node.left) {
      node.key = node.right.key;
      node.left = node.right.left;
      node.right = node.right.right;
      return;
    }

    // both exist, replace with node minimum from right sub-tree and delete the
    // node from the right sub-tree
    var minParent = findParentOfMinimum(node.right, node);
    var minNode = minParent.left ? minParent.left : minParent.right;
    var newKey = minNode.key;
    deleteNode(minNode, minParent, tree);
    node.key = newKey;
  }

  function findParentOfMinimum(node, parent) {
    if (!node.left) {
      return parent;
    }

    return findParentOfMinimum(node.left, node);
  }

  module.exports = BinarySearchTree;
});
