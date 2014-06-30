// Explanation: http://www.growingwiththeweb.com/2012/10/data-structures-binary-search-tree.html
//
// Complexity (n=input size):
//  contains:    O(n)*
//  delete:      O(n)*
//  findMaximum: O(n)*
//  findMinimum: O(n)*
//  insert:      O(n)*
//  traverse*:   O(n)
//  size:        O(1)
//
//  * O(log n) average case

// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.BinarySearchTree = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.BinarySearchTree = factory();
  }
}(this, function () {
  'use strict';

  var BinarySearchTree = function (customCompare) {
    this.root = undefined;
    this.nodeCount = 0;

    if (customCompare) {
      this.compare = customCompare;
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

  BinarySearchTree.prototype.delete = function (key) {
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
        deleteNode(current, parent);
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

  BinarySearchTree.prototype.insert = function (key) {
    var newNode = new Node(key);

    if (!this.root) {
      this.nodeCount++;
      this.root = newNode;
      return;
    }

    var current = this.root;
    while (true) {
      if (this.compare(key, current.key) < 0) {
        if (!current.left) {
          current.left = newNode;
          this.nodeCount++;
          return;
        }
        current = current.left;
      } else if (this.compare(key, current.key) > 0) {
        if (!current.right) {
          current.right = newNode;
          this.nodeCount++;
          return;
        }
        current = current.right;
      } else {
        break;
      }
    }
  };

  BinarySearchTree.prototype.size = function (operation) {
    return this.nodeCount;
  };

  BinarySearchTree.prototype.traversePreOrder = function (visit) {
    parentStack = [];
    parentStack.push(this.root);
    do {
      top = parentStack.pop();
      visit(top);
      if (top.right !== null) {
        parentStack.push(top.right);
      }
      if (top.left !== null) {
        parentStack.push(top.left);
      }
    } while (parentStack.length);
  };

  BinarySearchTree.prototype.traverseInOrder = function (visit) {
    parentStack = [];
    var node = this.root;
    while (parentStack.length || node) {
      if (node) {
        parentStack.push(node);
        node = node.left;
      } else {
        node = parentStack.pop();
        visit(node);
        node = node.right;
      }
    }
  };

  BinarySearchTree.prototype.traversePostOrder = function (visit) {
    parentStack = [];
    var node = this.root;
    var lastnodevisited;
    while (parentStack.length || node) {
      if (node) {
        parentStack.push(node);
        node = node.left;
      } else {
        peeknode = parentStack[parentStack.length - 1];
        if (peeknode.right && lastnodevisited !== peeknode.right) {
          // if right child exists AND traversing node from left child, move right
          node = peeknode.right;
        } else {
          parentStack.pop();
          visit(peeknode);
          lastnodevisited = peeknode;
        }
      }
    }
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

  function deleteNode(node, parent) {
    if (!node.left && !node.right) {
      parent.removeChild(node);
      return;
    }

    if (node.left && !node.right) {
      node.key = node.left.key;
      if (node.left.right) {
        node.right = node.left.right;
      }
      if (node.left.left) {
        node.left = node.left.left;
      } else {
        node.left = undefined;
      }
      return;
    }

    if (node.right && !node.left) {
      node.key = node.right.key;
      if (node.right.left) {
        node.left = node.left.left;
      }
      if (node.right.right) {
        node.right = node.left.right;
      } else {
        node.right = undefined;
      }
      return;
    }

    // both exist, replace with minimum from right sub-tree
    node.key = extractMinimum(node.right, node);
  }

  function extractMinimum(node, parent) {
    if (!node.left) {
      parent.removeChild(node);
      return node.key;
    }

    return extractMinimum(node.getLeft(), node);
  }

  function Node(key) {
    this.key = key;

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

  return BinarySearchTree;
}));
