var treeTests = require('./helpers/tree-tests');
var RedBlackTree = require('../index').RedBlackTree;

describe('red-black-tree', function () {
  'use strict';

  var tree;

  beforeEach(function () {
    tree = new RedBlackTree();
  });

  treeTests(RedBlackTree);
});
