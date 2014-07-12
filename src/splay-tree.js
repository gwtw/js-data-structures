// Explanation: http://www.growingwiththeweb.com/2013/06/data-structure-splay-tree.html
//
// Complexity (n=input size):
//  add:         O(log n) amortised
//  contains:    O(log n) amortised
//  findMaximum: O(n), O(log n) average
//  findMinimum: O(n), O(log n) average
//  isEmpty:     Θ(1)
//  remove:      O(log n) amortised
//  traverse*:   Θ(n)
//  size:        Θ(1)

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.SplayTree = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.SplayTree = factory();
  }
}(this, function () {
  'use strict';

  var SplayTree = function (customCompare) {
    this.root = undefined;
    this.nodeCount = 0;

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  SplayTree.prototype.add = function (key) {
    if (!this.root) {
      this.root = new Node(key);
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

  SplayTree.prototype.traversePreOrder = function (visit) {
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

  SplayTree.prototype.traverseInOrder = function (visit) {
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

  SplayTree.prototype.traversePostOrder = function (visit) {
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
        x.parent.right =  y;
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
        node.left = new Node(key, node);
        tree.nodeCount++;
        return true;
      }
    }

    if (tree.compare(key, node.key) > 0) {
      if (node.right) {
        return insertInternal(tree, key, node.right);
      } else {
        node.right = new Node(key, node);
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
      if (node.parent) {
        node.parent.removeChild(node);
      } else {
        tree.root = undefined;
      }
      tree.nodeCount--;
      return true;
    }

    if (node.left && !node.right) {
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
      return true;
    }

    if (node.right && !node.left) {
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

  function Node(key, parent) {
    this.key = key;
    this.parent = parent;
    this.left = undefined;
    this.right = undefined;
  }

  Node.prototype.removeChild = function (node) {
    if (this.left === node) {
      this.left = undefined;
    }
    if (this.right === node) {
      this.right = undefined;
    }
  };

  return SplayTree;
}));
