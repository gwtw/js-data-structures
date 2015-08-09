module.exports = function (Tree) {
  'use strict';

  var tree;

  beforeEach(function () {
    tree = new Tree();
  });

  describe('add', function () {
    it('Should insert a single element', function () {
      expect(tree.size()).toBe(0);
      expect(tree.add(1)).toBe(true);
      expect(tree.size()).toBe(1);
    });

    it('Should insert multiple elements', function () {
      expect(tree.size()).toBe(0);
      expect(tree.add(1)).toBe(true);
      expect(tree.size()).toBe(1);
      expect(tree.add(2)).toBe(true);
      expect(tree.size()).toBe(2);
      expect(tree.add(3)).toBe(true);
      expect(tree.size()).toBe(3);
    });
  });

  describe('remove', function () {
    describe('given a tree with 0 elements', function () {
      it('should return false', function () {
        expect(tree.remove(1)).toBe(false);
      });
    });

    describe('given a tree with 3 elements', function () {
      beforeEach(function () {
        tree.add(2);
        tree.add(1);
        tree.add(3);
      });

      it('should remove the first element', function () {
        expect(tree.remove(2)).toBe(true);
        expect(tree.size()).toBe(2);
      });

      it('should remove the second element', function () {
        expect(tree.remove(1)).toBe(true);
        expect(tree.size()).toBe(2);
      });

      it('should remove the third element', function () {
        expect(tree.remove(3)).toBe(true);
        expect(tree.size()).toBe(2);
      });

      it('should not remove non-existant elements', function () {
        expect(tree.remove(4)).toBe(false);
        expect(tree.size()).toBe(3);
      });
    });

    describe('given a tree with 7 elements', function () {
      beforeEach(function () {
        // Insert to be balanced in most tree structures
        tree.add(6);
        tree.add(2);
        tree.add(10);
        tree.add(0);
        tree.add(4);
        tree.add(8);
        tree.add(12);
      });

      it('should remove them all from highest to lowest', function () {
        for (var i = 12; i >= 0; i -= 2) {
          expect(tree.remove(i)).toBe(true);
        }
        expect(tree.isEmpty()).toBe(true);
      });

      it('should remove them all from lowest to highest', function () {
        for (var i = 0; i <= 12; i += 2) {
          expect(tree.remove(i)).toBe(true);
        }
        expect(tree.isEmpty()).toBe(true);
      });

      it('should remove them all starting from the middle', function () {
        for (var i = 0; i <= 12; i += 2) {
          expect(tree.remove((i + 6) % 14)).toBe(true);
        }
        expect(tree.isEmpty()).toBe(true);
      });

      it('should not remove non-existent elements', function () {
        for (var i = -1; i <= 13; i += 2) {
          expect(tree.remove(i)).toBe(false);
        }
        expect(tree.remove(-50)).toBe(false);
        expect(tree.remove(50)).toBe(false);
        expect(tree.size()).toBe(7);
      });
    });
  });

  describe('contains', function () {
    describe('given an empty tree', function () {
      it('should return false', function () {
        expect(tree.contains(1)).toBe(false);
      });
    });

    describe('given a tree with 1 element', function () {
      it('should return an inserted element', function () {
        tree.add(1);
        expect(tree.contains(1)).toBe(true);
      });

      it('should not return a non-existant element', function () {
        tree.add(1);
        expect(tree.contains(2)).toBe(false);
      });
    });

    describe('given a tree with 7 elements', function () {
      beforeEach(function () {
        // Insert to be balanced in most tree structures
        tree.add(6);
        tree.add(2);
        tree.add(10);
        tree.add(0);
        tree.add(4);
        tree.add(8);
        tree.add(12);
      });

      it('should return true for all existing elements', function () {
        for (var i = 0; i <= 12; i += 2) {
          expect(tree.contains(i)).toBe(true);
        }
      });

      it('should return false for non-existent elements', function () {
        for (var i = -1; i <= 13; i += 2) {
          expect(tree.contains(i)).toBe(false);
        }
        expect(tree.contains(-50)).toBe(false);
        expect(tree.contains(50)).toBe(false);
      });
    });
  });

  describe('findMinimum', function () {
    describe('with an empty tree', function () {
      it('should return undefined', function () {
        expect(tree.isEmpty()).toBe(true);
        expect(tree.findMinimum()).not.toBeDefined();
      });
    });

    describe('with a single element tree', function () {
      it('should return the smallest element', function () {
        tree.add(1);
        expect(tree.size()).toBe(1);
        expect(tree.findMinimum()).toBe(1);
      });
    });

    describe('with a multiple element tree', function () {
      it('should return the smallest element', function () {
        tree.add(3);
        tree.add(4);
        tree.add(1);
        tree.add(2);
        expect(tree.size()).toBe(4);
        expect(tree.findMinimum()).toBe(1);
      });
    });
  });

  describe('findMaximum', function () {
    describe('given an empty tree', function () {
      it('should return undefined', function () {
        expect(tree.isEmpty()).toBe(true);
        expect(tree.findMaximum()).not.toBeDefined();
      });
    });

    describe('given a single element tree', function () {
      it('should return the largest element', function () {
        tree.add(1);
        expect(tree.size()).toBe(1);
        expect(tree.findMaximum()).toBe(1);
      });
    });

    describe('given a multiple element tree', function () {
      it('should return the largest element', function () {
        tree.add(3);
        tree.add(4);
        tree.add(1);
        tree.add(2);
        expect(tree.size()).toBe(4);
        expect(tree.findMaximum()).toBe(4);
      });
    });
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
      it('should call the operation for the correct elements', function () {
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
      it('should call the operation for the correct elements', function () {
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
      it('should call the operation for the correct elements', function () {
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

  describe('with non-reverse customCompare', function () {
    it('should be able to add and remove elements', function () {
      tree = new Tree(function (a, b) {
        return a - b;
      });

      expect(tree.add(4)).toBe(true);
      expect(tree.add(1)).toBe(true);
      expect(tree.add(3)).toBe(true);
      expect(tree.add(4)).toBe(false);
      expect(tree.add(2)).toBe(true);
      expect(tree.remove(4)).toBe(true);
      expect(tree.remove(4)).toBe(false);
      expect(tree.remove(3)).toBe(true);
      expect(tree.remove(1)).toBe(true);
      expect(tree.remove(2)).toBe(true);
      expect(tree.isEmpty());
    });
  });

  describe('with reverse customCompare', function () {
    it('should be able to add and remove elements', function () {
      tree = new Tree(function (a, b) {
        return b - a;
      });

      expect(tree.add(4)).toBe(true);
      expect(tree.add(1)).toBe(true);
      expect(tree.add(3)).toBe(true);
      expect(tree.add(4)).toBe(false);
      expect(tree.add(2)).toBe(true);
      expect(tree.remove(4)).toBe(true);
      expect(tree.remove(4)).toBe(false);
      expect(tree.remove(3)).toBe(true);
      expect(tree.remove(1)).toBe(true);
      expect(tree.remove(2)).toBe(true);
      expect(tree.isEmpty());
    });
  });
};
