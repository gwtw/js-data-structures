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

  var SplayTree = function (customCompare) {
    this.nodeCount = 0;

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  SplayTree.prototype = Object.create(BaseBinaryTree.prototype);

  SplayTree.prototype.constructor = SplayTree;

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

  SplayTree.prototype.isEmpty = function () {
    return !this.root;
  };

  SplayTree.prototype.remove = function (key) {
    if (!this.root) {
      return false;
    }

    this.contains(key);
    return removeInternal(this, key, this.root);
  };

  SplayTree.prototype.size = function () {
    return this.nodeCount;
  };

  SplayTree.prototype.compare = function (a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  };

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

  function removeNodeWithNoChildren(tree, node) {
    if (node.parent) {
      node.parent.removeChild(node);
    } else {
      tree.root = undefined;
    }
    tree.nodeCount--;
  }

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

  function findParentOfMinimum(node, parent) {
    if (!node.left) {
      return parent;
    }

    return findParentOfMinimum(node.left, node);
  }

  module.exports = SplayTree;
});
