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
});
