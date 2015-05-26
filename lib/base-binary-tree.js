/**
 * @license
 * js-data-structures <http://github.com/Tyriar/js-data-structures>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/js-data-structures/blob/master/LICENSE>
 */
'use strict';

var BaseBinaryTree = function () {};

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
