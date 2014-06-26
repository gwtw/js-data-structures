var BinaryHeap = require("../src/binary-heap");

describe("binary-heap", function () {
  var heap;

  beforeEach(function () {
    heap = new BinaryHeap();
  });

  describe("insert", function () {
    it("should insert items into the heap", function () {
      expect(heap.size()).toBe(0);
      heap.insert(1, null);
      expect(heap.size()).toBe(1);
      heap.insert(2, null);
      expect(heap.size()).toBe(2);
      heap.insert(3, null);
      expect(heap.size()).toBe(3);
      heap.insert(4, null);
      expect(heap.size()).toBe(4);
      heap.insert(5, null);
      expect(heap.size()).toBe(5);
    });

    it("should return the inserted node", function () {
      var ret = heap.insert(1, 2);
      expect(ret.key).toEqual(1);
      expect(ret.value).toEqual(2);
    });
  });

  describe("extractMinimum", function () {
    it("Should extract the minimum item from the heap", function () {
      var node5 = heap.insert(5, null);
      var node3 = heap.insert(3, null);
      var node4 = heap.insert(4, null);
      var node1 = heap.insert(1, null);
      var node2 = heap.insert(2, null);
      expect(heap.extractMinimum()).toEqual(node1);
      expect(heap.extractMinimum()).toEqual(node2);
      expect(heap.extractMinimum()).toEqual(node3);
      expect(heap.extractMinimum()).toEqual(node4);
      expect(heap.extractMinimum()).toEqual(node5);
    });

    it("Should extract the minimum item from a heap containing negative items", function () {
      var node1 = heap.insert(-9, null);
      var node4 = heap.insert(6, null);
      var node3 = heap.insert(3, null);
      var node5 = heap.insert(10, null);
      var node2 = heap.insert(-4, null);
      expect(heap.extractMinimum()).toEqual(node1);
      expect(heap.extractMinimum()).toEqual(node2);
      expect(heap.extractMinimum()).toEqual(node3);
      expect(heap.extractMinimum()).toEqual(node4);
      expect(heap.extractMinimum()).toEqual(node5);
    });
  });

  describe("findMinimum", function () {
    it("should return the minimum item from the heap", function () {
      heap.insert(5, null);
      heap.insert(3, null);
      heap.insert(1, null);
      heap.insert(4, null);
      heap.insert(2, null);
      expect(heap.findMinimum().key).toBe(1);
    });
  });

  describe("isEmpty", function () {
    it("should return whether the heap is empty", function () {
      expect(heap.isEmpty()).toBe(true);
      heap.insert(1, null);
      expect(heap.isEmpty()).toBe(false);
      heap.extractMinimum();
      expect(heap.isEmpty()).toBe(true);
    });
  });

  describe("decreaseKey", function () {
    it("should decrease the minimum node", function () {
      var node1 = heap.insert(1, null);
      var node2 = heap.insert(2, null);
      heap.decreaseKey(node1, -3);
      expect(heap.findMinimum()).toEqual(node1);
    });

    it("should decrease and bubble up a non-minimum node", function () {
      var node1 = heap.insert(1, null);
      var node2 = heap.insert(2, null);
      heap.decreaseKey(node2, -3);
      expect(heap.findMinimum()).toEqual(node2);
    });

    it("should decrease and bubble up a non-minimum node in a large heap", function () {
      var node1 = heap.insert(13, null);
      var node2 = heap.insert(26, null);
      var node3 = heap.insert(3, null);
      var node4 = heap.insert(-6, null);
      var node5 = heap.insert(27, null);
      var node6 = heap.insert(88, null);
      var node7 = heap.insert(59, null);
      var node8 = heap.insert(-10, null);
      var node9 = heap.insert(16, null);
      heap.decreaseKey(node5, -11);
      expect(heap.findMinimum()).toEqual(node5);
    });
  });

  describe("delete", function () {
    it("should delete the head of the heap", function () {
      var node1 = heap.insert(1, null);
      var node2 = heap.insert(2, null);
      heap.delete(node1);
      expect(heap.extractMinimum()).toEqual(node2);
      expect(heap.isEmpty()).toBe(true);
    });
    
    it("should delete a node in the middle of the heap", function () {
      var node3 = heap.insert(13, null);
      var node4 = heap.insert(26, null);
      var node2 = heap.insert(3, null);
      var node1 = heap.insert(-6, null);
      var node5 = heap.insert(27, null);
      heap.delete(node3);
      expect(heap.extractMinimum()).toEqual(node1);
      expect(heap.extractMinimum()).toEqual(node2);
      expect(heap.extractMinimum()).toEqual(node4);
      expect(heap.extractMinimum()).toEqual(node5);
      expect(heap.isEmpty()).toBe(true);
    });
  });
});
