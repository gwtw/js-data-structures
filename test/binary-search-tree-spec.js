var BinarySearchTree = require("../src/binary-search-tree");

describe("binary-search-tree", function () {
  var tree;

  beforeEach(function () {
    tree = new BinarySearchTree();
  });

  describe("insert", function () {
    it("Should insert elements", function () {
      expect(tree.size()).toBe(0);
      tree.insert(1);
      expect(tree.size()).toBe(1);
      tree.insert(2);
      expect(tree.size()).toBe(2);
      tree.insert(3);
      expect(tree.size()).toBe(3);
    });
  });

  describe("delete", function () {
    it("should delete left child elements", function () {
      tree.insert(2);
      tree.insert(1);
      tree.insert(3);
      expect(tree.size()).toBe(3);
      expect(tree.delete(2)).toBe(true);
      expect(tree.size()).toBe(2);
    });

    it("should delete right child elements", function () {
      tree.insert(2);
      tree.insert(1);
      tree.insert(3);
      expect(tree.size()).toBe(3);
      expect(tree.delete(3)).toBe(true);
      expect(tree.size()).toBe(2);
    });

    it("should not delete non-existant elements", function () {
      tree.insert(2);
      tree.insert(1);
      tree.insert(3);
      expect(tree.size()).toBe(3);
      expect(tree.delete(4)).toBe(false);
      expect(tree.size()).toBe(3);
    });
  });

  describe("contains", function () {
    it("should return an inserted element", function () {
      tree.insert(1);
      expect(tree.contains(1)).toBe(true);
    });

    it("should not return a non-existant element", function () {
      tree.insert(1);
      expect(tree.contains(2)).toBe(false);
    });
  });

  describe("findMinimum", function () {
    describe("with an empty tree", function () {
      it("should return undefined", function () {
        expect(tree.isEmpty()).toBe(true);
        expect(tree.findMinimum()).not.toBeDefined();
      });
    });

    describe("with a single element tree", function () {
      it("should return the smallest element", function () {
        tree.insert(1);
        expect(tree.size()).toBe(1);
        expect(tree.findMinimum()).toBe(1);
      });
    });

    describe("with a multiple element tree", function () {
      it("should return the smallest element", function () {
        tree.insert(3);
        tree.insert(4);
        tree.insert(1);
        tree.insert(2);
        expect(tree.size()).toBe(4);
        expect(tree.findMinimum()).toBe(1);
      });
    });
  });

  describe("findMaximum", function () {
    describe("given an empty tree", function () {
      it("should return undefined", function () {
        expect(tree.isEmpty()).toBe(true);
        expect(tree.findMaximum()).not.toBeDefined();
      });
    });

    describe("given a single element tree", function () {
      it("should return the largest element", function () {
        tree.insert(1);
        expect(tree.size()).toBe(1);
        expect(tree.findMaximum()).toBe(1);
      });
    });

    describe("given a multiple element tree", function () {
      it("should return the largest element", function () {
        tree.insert(3);
        tree.insert(4);
        tree.insert(1);
        tree.insert(2);
        expect(tree.size()).toBe(4);
        expect(tree.findMaximum()).toBe(4);
      });
    });
  });

  describe("traversePreOrder", function () {
    describe("given an empty tree", function () {
      it("should not call the operation", function () {
        tree.traversePreOrder(function (v) {
          expect(true).toBe(false);
        });
      });
    });

    describe("given a single element tree", function () {
      it("should call the operation once for the correct element", function () {
        tree.insert(1);

        var expectedOrder = [1];
        var i = 0;
        tree.traversePreOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe("given a balanced tree with height 2", function () {
      it("should call the operation for the correct elements in the correct order", function () {
        tree.insert(2);
        tree.insert(1);
        tree.insert(3);

        var expectedOrder = [2, 1, 3];
        var i = 0;
        tree.traversePreOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe("given a balanced tree with height 3", function () {
      it("should call the operation for the correct elements in the correct order", function () {
        tree.insert(4);
        tree.insert(2);
        tree.insert(1);
        tree.insert(3);
        tree.insert(6);
        tree.insert(5);
        tree.insert(7);

        var expectedOrder = [4, 2, 1, 3, 6, 5, 7];
        var i = 0;
        tree.traversePreOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });
  });

  describe("traverseInOrder", function () {
    describe("given an empty tree", function () {
      it("should not call the operation", function () {
        tree.traverseInOrder(function (v) {
          expect(true).toBe(false);
        });
      });
    });

    describe("given a single element tree", function () {
      it("should call the operation once for the correct element", function () {
        tree.insert(1);

        var expectedOrder = [1];
        var i = 0;
        tree.traverseInOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe("given a balanced tree with height 2", function () {
      it("should call the operation for the correct elements in the correct order", function () {
        tree.insert(2);
        tree.insert(1);
        tree.insert(3);

        var expectedOrder = [1, 2, 3];
        var i = 0;
        tree.traverseInOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe("given a balanced tree with height 3", function () {
      it("should call the operation for the correct elements in the correct order", function () {
        tree.insert(4);
        tree.insert(2);
        tree.insert(1);
        tree.insert(3);
        tree.insert(6);
        tree.insert(5);
        tree.insert(7);

        var expectedOrder = [1, 2, 3, 4, 5, 6, 7];
        var i = 0;
        tree.traverseInOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });
  });

  describe("traversePostOrder", function () {
    describe("given an empty tree", function () {
      it("should not call the operation", function () {
        tree.traversePreOrder(function (v) {
          expect(true).toBe(false);
        });
      });
    });

    describe("given a single element tree", function () {
      it("should call the operation once for the correct element", function () {
        tree.insert(1);

        var expectedOrder = [1];
        var i = 0;
        tree.traversePostOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe("given a balanced tree with height 2", function () {
      it("should call the operation for the correct elements in the correct order", function () {
        tree.insert(2);
        tree.insert(1);
        tree.insert(3);

        var expectedOrder = [1, 3, 2];
        var i = 0;
        tree.traversePostOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe("given a balanced tree with height 3", function () {
      it("should call the operation for the correct elements in the correct order", function () {
        tree.insert(4);
        tree.insert(2);
        tree.insert(1);
        tree.insert(3);
        tree.insert(6);
        tree.insert(5);
        tree.insert(7);

        var expectedOrder = [1, 3, 2, 5, 7, 6, 4];
        var i = 0;
        tree.traversePostOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });
  });
});
