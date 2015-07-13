var treeTests = require('./helpers/tree-tests');
var BinarySearchTree = require('../index').BinarySearchTree;

describe('binary-search-tree', function () {
  'use strict';

  treeTests(BinarySearchTree);

  var tree;

  beforeEach(function () {
    tree = new BinarySearchTree();
  });

  describe('traversePreOrder', function () {
    describe('given an empty tree', function () {
      it('should not call the operation', function () {
        tree.traversePreOrder(function () {
          expect(true).toBe(false);
        });
      });
    });

    describe('given a single element tree', function () {
      it('should call the operation once for the correct element', function () {
        tree.add(1);

        var expectedOrder = [1];
        var i = 0;
        tree.traversePreOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe('given a balanced tree with height 2', function () {
      it('should call the operation for the correct elements in the correct order', function () {
        tree.add(2);
        tree.add(1);
        tree.add(3);

        var expectedOrder = [2, 1, 3];
        var i = 0;
        tree.traversePreOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe('given a balanced tree with height 3', function () {
      it('should call the operation for the correct elements in the correct order', function () {
        tree.add(4);
        tree.add(2);
        tree.add(1);
        tree.add(3);
        tree.add(6);
        tree.add(5);
        tree.add(7);

        var expectedOrder = [4, 2, 1, 3, 6, 5, 7];
        var i = 0;
        tree.traversePreOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });
  });

  describe('traverseInOrder', function () {
    describe('given an empty tree', function () {
      it('should not call the operation', function () {
        tree.traverseInOrder(function () {
          expect(true).toBe(false);
        });
      });
    });

    describe('given a single element tree', function () {
      it('should call the operation once for the correct element', function () {
        tree.add(1);

        var expectedOrder = [1];
        var i = 0;
        tree.traverseInOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe('given a balanced tree with height 2', function () {
      it('should call the operation for the correct elements in the correct order', function () {
        tree.add(2);
        tree.add(1);
        tree.add(3);

        var expectedOrder = [1, 2, 3];
        var i = 0;
        tree.traverseInOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe('given a balanced tree with height 3', function () {
      it('should call the operation for the correct elements in the correct order', function () {
        tree.add(4);
        tree.add(2);
        tree.add(1);
        tree.add(3);
        tree.add(6);
        tree.add(5);
        tree.add(7);

        var expectedOrder = [1, 2, 3, 4, 5, 6, 7];
        var i = 0;
        tree.traverseInOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });
  });

  describe('traversePostOrder', function () {
    describe('given an empty tree', function () {
      it('should not call the operation', function () {
        tree.traversePreOrder(function () {
          expect(true).toBe(false);
        });
      });
    });

    describe('given a single element tree', function () {
      it('should call the operation once for the correct element', function () {
        tree.add(1);

        var expectedOrder = [1];
        var i = 0;
        tree.traversePostOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe('given a balanced tree with height 2', function () {
      it('should call the operation for the correct elements in the correct order', function () {
        tree.add(2);
        tree.add(1);
        tree.add(3);

        var expectedOrder = [1, 3, 2];
        var i = 0;
        tree.traversePostOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe('given a balanced tree with height 3', function () {
      it('should call the operation for the correct elements in the correct order', function () {
        tree.add(4);
        tree.add(2);
        tree.add(1);
        tree.add(3);
        tree.add(6);
        tree.add(5);
        tree.add(7);

        var expectedOrder = [1, 3, 2, 5, 7, 6, 4];
        var i = 0;
        tree.traversePostOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });
  });
});
