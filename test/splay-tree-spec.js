var treeTests = require('./helpers/tree-tests');
var SplayTree = require('../src/splay-tree');

describe('splay-tree', function () {
  'use strict';

  treeTests(SplayTree);
});
