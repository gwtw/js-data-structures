var heapTests = require('./helpers/heap-tests');
var heapHeavyTests = require('./helpers/heap-heavy-tests');
var FibonacciHeap = require('../src/fibonacci-heap');

describe('fibonacci-heap', function () {
  'use strict';

  heapTests(FibonacciHeap);
  heapHeavyTests(FibonacciHeap);

  describe('calling insert 1000 times', function () {
    var heap;

    beforeEach(function () {
      heap = new FibonacciHeap();
      for (var i = 0; i < 1000; i++) {
        heap.insert(i, i);
      }
    });

    it('should have a nodelist of length 1000', function () {
      var count = 0;
      var node = heap.minNode;
      do {
        count++;
        node = node.next;
      } while (node !== heap.minNode);
      expect(count).toBe(1000);
    });

    it('should have a nodelist of length 1000 (searching backwards)', function () {
      var count = 0;
      var node = heap.minNode;
      do {
        count++;
        node = node.prev;
      } while (node !== heap.minNode);
      expect(count).toBe(1000);
    });

    it('should have a nodelist with no parents or children', function () {
      var childCount = 0;
      var parentCount = 0;
      var node = heap.minNode;
      do {
        if (node.child) {
          childCount++;
        }
        if (node.parent) {
          parentCount++;
        }
        node = node.next;
      } while (node !== heap.minNode);
      expect(childCount).toBe(0);
      expect(parentCount).toBe(0);
    });

    it('should contain correct key-value pairs', function () {
      var invalidCount = 0;
      var node = heap.minNode;
      do {
        if (node.key !== node.value) {
          invalidCount++;
        }
        node = node.prev;
      } while (node !== heap.minNode);
      expect(invalidCount).toBe(0);
    });

    describe('calling extractMinimum twice', function () {
      it('should return the correct elements', function () {
        expect(heap.extractMinimum().key).toBe(0);
        expect(heap.extractMinimum().key).toBe(1);
      });
    });
  });

  describe('given a heap with a tree of degree 3', function () {
    var heap;
    var node5;
    var node6;

    beforeEach(function () {
      heap = new FibonacciHeap();
      heap.insert(1);
      heap.insert(2);
      heap.insert(4);
      node5 = heap.insert(5);
      node6 = heap.insert(6);
      heap.insert(7);
      heap.insert(8);
      heap.insert(9);
      heap.insert(10);
      // consolidate the heap (removing 1)
      heap.extractMinimum();
      expect(heap.minNode.key).toBe(2);
      expect(heap.minNode.degree).toBe(3);
      expect(heap.minNode.prev).toBe(heap.minNode.prev);
      expect(heap.minNode.next).toBe(heap.minNode.next);
    });

    describe('calling decreaseKey on a node to make it the minimum', function () {
      beforeEach(function () {
        heap.decreaseKey(node6, 0);
      });

      it('should make the node the minimum', function () {
        expect(heap.minNode.key).toBe(0);
      });

      it('should cut the node from the tree', function () {
        expect(heap.minNode.prev.key).toBe(2);
        expect(heap.minNode.next.key).toBe(2);
      });
    });

    describe('calling decreaseKey on a node to a value less than its parent (the condition to cut)', function () {
      beforeEach(function () {
        heap.decreaseKey(node6, 3);
      });

      it('should retain the same minimum node', function () {
        expect(heap.minNode.key).toBe(2);
      });

      it('should cut the node from the tree', function () {
        expect(heap.minNode.prev.key).toBe(3);
        expect(heap.minNode.next.key).toBe(3);
      });

      it('should not contain any cycles (regression test)', function () {
        expect(heap.size()).toBe(8);
      });
    });

    describe('calling delete on a node with children (the condition to cut)', function () {
      beforeEach(function () {
        heap.delete(node5);
      });

      it('should retain the same minimum node', function () {
        expect(heap.minNode.key).toBe(2);
      });

      it('should move its children on to the root list', function () {
        expect(heap.minNode.prev.key).not.toBe(heap.minNode.key);
        expect(heap.minNode.next.key).not.toBe(heap.minNode.key);
      });
    });
  });
});
