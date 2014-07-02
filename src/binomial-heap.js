// Explanation: http://www.growingwiththeweb.com/2014/01/binomial-heap.html
//
// Complexity (n=input size):
//   clear:          Θ(1)
//   extractMinimum: Θ(log n)
//   findMinimum:    O(log n) amortised
//   insert:         O(log n)
//   isEmpty:        Θ(1)
//   size:           Θ(1)
//   union:          Θ(log n)

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.BinomialHeap = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.BinomialHeap = factory();
  }
}(this, function () {
  'use strict';

  var BinomialHeap = function (customCompare) {
    this.head = undefined;
    this.nodeCount = 0;

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  BinomialHeap.prototype.clear = function () {
    this.head = undefined;
    this.nodeCount = 0;
  };

  BinomialHeap.prototype.extractMinimum = function () {
    if (!this.head) {
      return undefined;
    }

    var min = this.head;
    var minPrev;
    var next = min.sibling;
    var nextPrev = min;

    while (next) {
      if (this.compare(next, min) < 0) {
        min = next;
        minPrev = nextPrev;
      }
      nextPrev = next;
      next = next.sibling;
    }

    removeTreeRoot(this, min, minPrev);
    this.nodeCount--;

    return min;
  };

  BinomialHeap.prototype.findMinimum = function () {
    if (!this.head) {
      return undefined;
    } else {
      var min = this.head;
      var next = min.sibling;

      while (next) {
        if (this.compare(next, min) < 0) {
          min = next;
        }
        next = next.sibling;
      }

      return min;
    }
  };

  BinomialHeap.prototype.insert = function (key, value) {
    var tempHeap = new BinomialHeap();
    var newNode = new Node(key, value);
    tempHeap.head = newNode;
    tempHeap.nodeCount++;
    this.union(tempHeap);
    return newNode;
  };

  BinomialHeap.prototype.isEmpty = function () {
    return !this.head;
  };

  BinomialHeap.prototype.size = function () {
    return this.nodeCount;
  };

  BinomialHeap.prototype.union = function (heap) {
    this.nodeCount += heap.nodeCount;

    var newHead = mergeHeaps(this, heap);

    this.head = undefined;
    heap.head = undefined;

    if (!newHead) {
      return undefined;
    }

    var prev;
    var curr = newHead;
    var next = newHead.sibling;

    while (next) {
      if (curr.degree !== next.degree || (next.sibling && next.sibling.degree === curr.degree)) {
        prev = curr;
        curr = next;
      } else {
        if (this.compare(curr, next) < 0) {
          curr.sibling = next.sibling;
          linkTrees(curr, next);
        } else {
          if (!prev) {
            newHead = next;
          } else {
            prev.sibling = next;
          }

          linkTrees(next, curr);
          curr = next;
        }
      }

      next = curr.sibling;
    }

    this.head = newHead;
  };

  BinomialHeap.prototype.compare = function (a, b) {
    if (a.key > b.key) {
      return 1;
    }
    if (a.key < b.key) {
      return -1;
    }
    return 0;
  };

  function mergeHeaps(a, b) {
    if (!a.head) {
      return b.head;
    } else if (!b.head) {
      return a.head;
    } else {
      var head;
      var aNext = a.head;
      var bNext = b.head;

      if (a.head.degree <= b.head.degree) {
        head = a.head;
        aNext = aNext.sibling;
      } else {
        head = b.head;
        bNext = bNext.sibling;
      }

      var tail = head;

      while (aNext && bNext) {
        if (aNext.degree <= bNext.degree) {
          tail.sibling = aNext;
          aNext = aNext.sibling;
        } else {
          tail.sibling = bNext;
          bNext = bNext.sibling;
        }

        tail = tail.sibling;
      }

      tail.sibling = aNext ? aNext : bNext;

      return head;
    }
  }

  // Link two binomial trees of the same order
  function linkTrees(minNodeTree, other) {
    other.parent = minNodeTree;
    other.sibling = minNodeTree.child;
    minNodeTree.child = other;
    minNodeTree.degree++;
  }

  function removeTreeRoot(heap, root, prev) {
    // Remove root from the heap
    if (root === heap.head) {
      heap.head = root.sibling;
    } else {
      prev.sibling = root.sibling;
    }

    // Reverse the order of root's children and make a new heap
    var newHead;
    var child = root.child;
    while (child) {
      var next = child.sibling;
      child.sibling = newHead;
      child.parent = undefined;
      newHead = child;
      child = next;
    }
    var newHeap = new BinomialHeap();
    newHeap.head = newHead;

    heap.union(newHeap);
  }

  function Node(key, value) {
    this.key = key;
    this.value = value;
    this.degree = undefined;
    this.parent = undefined;
    this.child = undefined;
    this.sibling = undefined;
  }

  return BinomialHeap;
}));
