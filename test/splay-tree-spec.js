var treeTests = require('./helpers/tree-tests');
var SplayTree = require('../index').SplayTree;

describe('splay-tree', function () {
  'use strict';

  treeTests(SplayTree);
});
