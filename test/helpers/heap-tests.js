module.exports = function (Heap) {
  var heap;

  beforeEach(function () {
    heap = new Heap();
  });

  if (Heap.prototype.insert) {
    describe("insert", function () {
      it("should insert items into the heap", function () {
        heap.insert(1, null);
        heap.insert(2, null);
        heap.insert(3, null);
        heap.insert(4, null);
        heap.insert(5, null);
        expect(heap.size()).toBe(5);
      });

      it("should return the inserted node", function () {
        var ret = heap.insert(1, { 'foo': 'bar' });
        expect(ret.key).toEqual(1);
        expect(ret.value).toEqual({ 'foo': 'bar' });
      });
    });
  }

  if (Heap.prototype.extractMinimum) {
    describe("extractMinimum", function () {
      it("should extract the minimum item from a heap", function () {
        var node5 = heap.insert(5, null);
        var node3 = heap.insert(3, null);
        var node4 = heap.insert(4, null);
        var node1 = heap.insert(1, null);
        var node2 = heap.insert(2, null);
        expect(heap.extractMinimum().key).toEqual(node1.key);
        expect(heap.extractMinimum().key).toEqual(node2.key);
        expect(heap.extractMinimum().key).toEqual(node3.key);
        expect(heap.extractMinimum().key).toEqual(node4.key);
        expect(heap.extractMinimum().key).toEqual(node5.key);
      });

      it("should extract the minimum item from a jumbled heap", function () {
        var node1 = heap.insert(1, null);
        var node4 = heap.insert(4, null);
        var node3 = heap.insert(3, null);
        var node5 = heap.insert(5, null);
        var node2 = heap.insert(2, null);
        expect(heap.extractMinimum().key).toEqual(node1.key);
        expect(heap.extractMinimum().key).toEqual(node2.key);
        expect(heap.extractMinimum().key).toEqual(node3.key);
        expect(heap.extractMinimum().key).toEqual(node4.key);
        expect(heap.extractMinimum().key).toEqual(node5.key);
      });

      it("should extract the minimum item from a heap containing negative items", function () {
        var node1 = heap.insert(-9, null);
        var node4 = heap.insert(6, null);
        var node3 = heap.insert(3, null);
        var node5 = heap.insert(10, null);
        var node2 = heap.insert(-4, null);
        expect(heap.extractMinimum().key).toEqual(node1.key);
        expect(heap.extractMinimum().key).toEqual(node2.key);
        expect(heap.extractMinimum().key).toEqual(node3.key);
        expect(heap.extractMinimum().key).toEqual(node4.key);
        expect(heap.extractMinimum().key).toEqual(node5.key);
      });
    });
  }

  if (Heap.prototype.findMinimum) {
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
  }

  if (Heap.prototype.isEmpty) {
    describe("isEmpty", function () {
      it("should return whether the heap is empty", function () {
        expect(heap.isEmpty()).toBe(true);
        heap.insert(1, null);
        expect(heap.isEmpty()).toBe(false);
        heap.extractMinimum();
        expect(heap.isEmpty()).toBe(true);
      });
    });
  }

  if (Heap.prototype.decreaseKey) {
    describe("decreaseKey", function () {
      it("should decrease the minimum node", function () {
        var node1 = heap.insert(1, null);
        var node2 = heap.insert(2, null);
        heap.decreaseKey(node1, -3);
        var key = heap.findMinimum().key;
        expect(key).toEqual(node1.key);
        expect(key).toBe(-3);
      });

      it("should decrease and bubble up a non-minimum node", function () {
        var node1 = heap.insert(1, null);
        var node2 = heap.insert(2, null);
        heap.decreaseKey(node2, -3);
        var key = heap.findMinimum().key;
        expect(key).toEqual(node2.key);
        expect(key).toEqual(-3);
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
        expect(heap.findMinimum().key).toEqual(node5.key);
      });

      it("should leave a valid tree", function () {
        var node1 = heap.insert(13, null);
        var node2 = heap.insert(26, null);
        var node3 = heap.insert(3, null);
        var node4 = heap.insert(-6, null);
        var node5 = heap.insert(27, null);
        var node6 = heap.insert(88, null);
        var node7 = heap.insert(59, null);
        var node8 = heap.insert(-10, null);
        var node9 = heap.insert(16, null);
        heap.decreaseKey(node6, -8);
        expect(heap.extractMinimum().key).toEqual(-10);
        expect(heap.extractMinimum().key).toEqual(-8);
        expect(heap.extractMinimum().key).toEqual(-6);
        expect(heap.extractMinimum().key).toEqual(3);
        expect(heap.extractMinimum().key).toEqual(13);
        expect(heap.extractMinimum().key).toEqual(16);
        expect(heap.extractMinimum().key).toEqual(26);
        expect(heap.extractMinimum().key).toEqual(27);
        expect(heap.extractMinimum().key).toEqual(59);
      });
    });
  }

  if (Heap.prototype.delete) {
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
        expect(heap.size()).toBe(5);
        heap.delete(node3);
        expect(heap.size()).toBe(4);
        expect(heap.extractMinimum().key).toEqual(node1.key);
        expect(heap.extractMinimum().key).toEqual(node2.key);
        expect(heap.extractMinimum().key).toEqual(node4.key);
        expect(heap.extractMinimum().key).toEqual(node5.key);
        expect(heap.isEmpty()).toBe(true);
      });
    });
  }

  if (Heap.prototype.buildHeap) {
    describe("buildHeap", function () {
      it("should replace old heap with new array", function () {
        heap.insert(2, null);
        heap.insert(3, null);
        heap.insert(1, null);
        expect(heap.size()).toBe(3);
        heap.buildHeap([9,8,7,6,5,4], [null,null,null,null,null,null]);
        expect(heap.size()).toBe(6);
        expect(heap.extractMinimum().key).toBe(4);
        expect(heap.extractMinimum().key).toBe(5);
        expect(heap.extractMinimum().key).toBe(6);
        expect(heap.extractMinimum().key).toBe(7);
        expect(heap.extractMinimum().key).toBe(8);
        expect(heap.extractMinimum().key).toBe(9);
        expect(heap.isEmpty()).toBe(true);
      });
    });
  }

  if (Heap.prototype.union) {
    describe("union", function () {
      it("should union two heaps together", function () {
        heap.insert(9, null);
        heap.insert(10, null);
        heap.insert(6, null);
        heap.insert(3, null);
        heap.insert(4, null);
        var other = new Heap();
        other.insert(5, null);
        other.insert(7, null);
        other.insert(2, null);
        other.insert(8, null);
        other.insert(1, null);
        expect(heap.size()).toBe(5);
        expect(other.size()).toBe(5);
        heap.union(other);
        expect(heap.size()).toBe(10);
        for (i = 1; i <= 10; i++) {
          expect(heap.extractMinimum().key).toBe(i);
        }
        expect(heap.isEmpty()).toBe(true);
      });
    });
  }

  if (Heap.prototype.clear) {
    describe("clear", function () {
      it("should set the heap's size to 0", function () {
        heap.insert(1, null);
        heap.insert(2, null);
        heap.insert(3, null);
        heap.clear();
        expect(heap.size()).toBe(0);
      });

      it("should set the heap's minimum node to undefined", function () {
        heap.insert(1, null);
        heap.insert(2, null);
        heap.insert(3, null);
        heap.clear();
        expect(heap.findMinimum()).not.toBeDefined();
      });
    });
  }

  describe("with non-reverse customCompare", function () {
    it("should give a min heap", function () {
      heap = new Heap(function (a, b) {
        return a.key - b.key;
      });
      var node3 = heap.insert(13, null);
      var node4 = heap.insert(26, null);
      var node2 = heap.insert(3, null);
      var node1 = heap.insert(-6, null);
      var node5 = heap.insert(27, null);
      expect(heap.size()).toBe(5);
      expect(heap.extractMinimum().key).toEqual(node1.key);
      expect(heap.extractMinimum().key).toEqual(node2.key);
      expect(heap.extractMinimum().key).toEqual(node3.key);
      expect(heap.extractMinimum().key).toEqual(node4.key);
      expect(heap.extractMinimum().key).toEqual(node5.key);
      expect(heap.isEmpty()).toBe(true);
    });
  });

  describe("with reverse customCompare", function () {
    it("should give a max heap", function () {
      heap = new Heap(function (a, b) {
        return b.key - a.key;
      });
      var node3 = heap.insert(13, null);
      var node4 = heap.insert(26, null);
      var node2 = heap.insert(3, null);
      var node1 = heap.insert(-6, null);
      var node5 = heap.insert(27, null);
      expect(heap.size()).toBe(5);
      expect(heap.extractMinimum().key).toEqual(node5.key);
      expect(heap.extractMinimum().key).toEqual(node4.key);
      expect(heap.extractMinimum().key).toEqual(node3.key);
      expect(heap.extractMinimum().key).toEqual(node2.key);
      expect(heap.extractMinimum().key).toEqual(node1.key);
      expect(heap.isEmpty()).toBe(true);
    });
  });

  it("should work with string keys", function () {
    var node3 = heap.insert('f', null);
    var node4 = heap.insert('o', null);
    var node2 = heap.insert('c', null);
    var node1 = heap.insert('a', null);
    var node5 = heap.insert('q', null);
    expect(heap.size()).toBe(5);
    expect(heap.extractMinimum().key).toEqual(node1.key);
    expect(heap.extractMinimum().key).toEqual(node2.key);
    expect(heap.extractMinimum().key).toEqual(node3.key);
    expect(heap.extractMinimum().key).toEqual(node4.key);
    expect(heap.extractMinimum().key).toEqual(node5.key);
    expect(heap.isEmpty()).toBe(true);
  });
};
