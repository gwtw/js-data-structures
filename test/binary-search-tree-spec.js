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
    describe("with an empty tree", function () {
      it("should return undefined", function () {
        expect(tree.isEmpty()).toBe(true);
        expect(tree.findMaximum()).not.toBeDefined();
      });
    });

    describe("with a single element tree", function () {
      it("should return the largest element", function () {
        tree.insert(1);
        expect(tree.size()).toBe(1);
        expect(tree.findMaximum()).toBe(1);
      });
    });

    describe("with a multiple element tree", function () {
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
});
