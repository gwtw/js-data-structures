var BinomialHeap = require("../src/binomial-heap");

describe("binomial-heap", function () {
  var heap;

  beforeEach(function () {
    heap = new BinomialHeap();
  });

  describe("insert", function () {
    it("should insert items into the heap", function () {
      expect(heap.size()).toBe(0);
      heap.insert(1);
      expect(heap.size()).toBe(1);
      heap.insert(2);
      expect(heap.size()).toBe(2);
      heap.insert(3);
      expect(heap.size()).toBe(3);
      heap.insert(4);
      expect(heap.size()).toBe(4);
      heap.insert(5);
      expect(heap.size()).toBe(5);
    });
  });

  describe("extractMinimum", function () {
    it("Should extract the minimum item from the heap", function () {
      heap.insert(5);
      heap.insert(3);
      heap.insert(4);
      heap.insert(1);
      heap.insert(2);
      expect(heap.extractMinimum()).toBe(1);
      expect(heap.extractMinimum()).toBe(2);
      expect(heap.extractMinimum()).toBe(3);
      expect(heap.extractMinimum()).toBe(4);
      expect(heap.extractMinimum()).toBe(5);
    });

    it("Should extract the minimum item from a heap containing negative items", function () {
      heap.insert(-9);
      heap.insert(6);
      heap.insert(3);
      heap.insert(10);
      heap.insert(-4);
      expect(heap.extractMinimum()).toBe(-9);
      expect(heap.extractMinimum()).toBe(-4);
      expect(heap.extractMinimum()).toBe(3);
      expect(heap.extractMinimum()).toBe(6);
      expect(heap.extractMinimum()).toBe(10);
    });
  });

  describe("findMinimum", function () {
    it("should return the minimum item from the heap", function () {
      heap.insert(5);
      heap.insert(3);
      heap.insert(1);
      heap.insert(4);
      heap.insert(2);
      expect(heap.findMinimum()).toBe(1);
    });
  });

  describe("isEmpty", function () {
    it("should return whether the heap is empty", function () {
      expect(heap.isEmpty()).toBe(true);
      heap.insert(1);
      expect(heap.isEmpty()).toBe(false);
      heap.extractMinimum();
      expect(heap.isEmpty()).toBe(true);
    });
  });
});
