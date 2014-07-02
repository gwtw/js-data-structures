module.exports = function (Tree) {
  var tree;

  beforeEach(function () {
    tree = new Tree();
  });

  describe("add", function () {
    it("Should insert elements", function () {
      expect(tree.size()).toBe(0);
      tree.add(1);
      expect(tree.size()).toBe(1);
      tree.add(2);
      expect(tree.size()).toBe(2);
      tree.add(3);
      expect(tree.size()).toBe(3);
    });
  });

  describe("remove", function () {
    it("should remove left child elements", function () {
      tree.add(2);
      tree.add(1);
      tree.add(3);
      expect(tree.size()).toBe(3);
      expect(tree.remove(2)).toBe(true);
      expect(tree.size()).toBe(2);
    });

    it("should remove right child elements", function () {
      tree.add(2);
      tree.add(1);
      tree.add(3);
      expect(tree.size()).toBe(3);
      expect(tree.remove(3)).toBe(true);
      expect(tree.size()).toBe(2);
    });

    it("should not remove non-existant elements", function () {
      tree.add(2);
      tree.add(1);
      tree.add(3);
      expect(tree.size()).toBe(3);
      expect(tree.remove(4)).toBe(false);
      expect(tree.size()).toBe(3);
    });
  });

  describe("contains", function () {
    it("should return an inserted element", function () {
      tree.add(1);
      expect(tree.contains(1)).toBe(true);
    });

    it("should not return a non-existant element", function () {
      tree.add(1);
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
        tree.add(1);
        expect(tree.size()).toBe(1);
        expect(tree.findMinimum()).toBe(1);
      });
    });

    describe("with a multiple element tree", function () {
      it("should return the smallest element", function () {
        tree.add(3);
        tree.add(4);
        tree.add(1);
        tree.add(2);
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
        tree.add(1);
        expect(tree.size()).toBe(1);
        expect(tree.findMaximum()).toBe(1);
      });
    });

    describe("given a multiple element tree", function () {
      it("should return the largest element", function () {
        tree.add(3);
        tree.add(4);
        tree.add(1);
        tree.add(2);
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
        tree.add(1);

        var expectedOrder = [1];
        var i = 0;
        tree.traversePreOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe("given a balanced tree with height 2", function () {
      it("should call the operation for the correct elements", function () {
        tree.add(2);
        tree.add(1);
        tree.add(3);

        var elements = [1, 2, 3];
        var traversed = [];
        tree.traversePreOrder(function (v) {
          traversed.push(v);
        });
        traversed.sort();
        expect(elements).toEqual(traversed);
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
        tree.add(1);

        var expectedOrder = [1];
        var i = 0;
        tree.traverseInOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe("given a balanced tree with height 2", function () {
      it("should call the operation for the correct elements", function () {
        tree.add(2);
        tree.add(1);
        tree.add(3);

        var elements = [1, 2, 3];
        var traversed = [];
        tree.traversePreOrder(function (v) {
          traversed.push(v);
        });
        traversed.sort();
        expect(elements).toEqual(traversed);
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
        tree.add(1);

        var expectedOrder = [1];
        var i = 0;
        tree.traversePostOrder(function (v) {
          expect(v).toBe(expectedOrder[i++]);
        });
      });
    });

    describe("given a balanced tree with height 2", function () {
      it("should call the operation for the correct elements", function () {
        tree.add(2);
        tree.add(1);
        tree.add(3);

        var elements = [1, 2, 3];
        var traversed = [];
        tree.traversePreOrder(function (v) {
          traversed.push(v);
        });
        traversed.sort();
        expect(elements).toEqual(traversed);
      });
    });
  });
};
