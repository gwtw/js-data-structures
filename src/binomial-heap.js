// Explanation: http://www.growingwiththeweb.com/2014/01/binomial-heap.html
//
// Complexity (n=input size):
//   Extract minimum: O(log n)
//   Find minimum:    O(log n)
//   Insert:          O(log n)
//   Union:           O(log n)

// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
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
    this.head = null;
    this.nodeCount = 0;

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  BinomialHeap.prototype.extractMinimum = function () {
    if (this.head == null) {
      return null;
    }

    var min = this.head;
    var minPrev = null;
    var next = min.sibling;
    var nextPrev = min;

    while (next != null) {
      if (this.compare(next, min) < 0) {
        min = next;
        minPrev = nextPrev;
      }
      nextPrev = next;
      next = next.sibling;
    }

    this.removeTreeRoot(min, minPrev);
    this.nodeCount--;

    return min;
  };

  BinomialHeap.prototype.findMinimum = function () {
    if (this.head === null) {
      return undefined;
    } else {
      var min = this.head;
      var next = min.sibling;

      while (next != null) {
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
    return this.head === null;
  };

  // Merge two binomial trees of the same order
  BinomialHeap.prototype.linkTree = function (minNodeTree, other) {
    other.parent = minNodeTree;
    other.sibling = minNodeTree.child;
    minNodeTree.child = other;
    minNodeTree.degree++;
  };

  BinomialHeap.prototype.removeTreeRoot = function (root, prev) {
    // Remove root from the heap
    if (root == this.head) {
      this.head = root.sibling;
    } else {
      prev.sibling = root.sibling;
    }

    // Reverse the order of root's children and make a new heap
    var newHead = null;
    var child = root.child;
    while (child != null) {
      var next = child.sibling;
      child.sibling = newHead;
      child.parent = null;
      newHead = child;
      child = next;
    }
    var newHeap = new BinomialHeap();
    newHeap.head = newHead;

    this.union(newHeap);
  };

  BinomialHeap.prototype.size = function () {
    return this.nodeCount;
  };

  BinomialHeap.prototype.union = function (heap) {
    this.nodeCount += heap.nodeCount;
    
    var newHead = mergeHeaps(this, heap);

    this.head = null;
    heap.head = null;

    if (newHead == null) {
      return null;
    }

    var prev = null;
    var curr = newHead;
    var next = newHead.sibling;

    while (next != null) {
      if (curr.degree != next.degree || (next.sibling != null && 
          next.sibling.degree == curr.degree)) {
        prev = curr;
        curr = next;
      } else {
        if (this.compare(curr, next) < 0) {
          curr.sibling = next.sibling;
          this.linkTree(curr, next);
        } else {
          if (prev == null) {
            newHead = next;
          } else {
            prev.sibling = next;
          }

          this.linkTree(next, curr);
          curr = next;
        }
      }

      next = curr.sibling;
    }

    this.head = newHead;
  }

  BinomialHeap.prototype.compare = function (a, b) {
    if (a.key > b.key) return 1;
    if (a.key < b.key) return -1;
    return 0;
  }

  var Node = function (key, value) {
    this.key = key;
    this.value = value;
    this.degree = undefined;
    this.parent = undefined;
    this.child = undefined;
    this.sibling = undefined;
  };

  function mergeHeaps(a, b) {
    if (a.head == null) {
      return b.head;
    } else if (b.head == null) {
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

      while (aNext != null && bNext != null) {
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

  function swap(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  }

  return BinomialHeap;
}));
