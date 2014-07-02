// Explanation: http://www.growingwiththeweb.com/2014/01/binomial-heap.html
//
// Complexity (n=input size):
//   clear:          Θ(1) amortised
//   decreaseKey:    Θ(1) amortised
//   delete:         O(log n) amortised
//   extractMinimum: O(log n) amortised
//   findMinimum:    Θ(1)
//   insert:         Θ(1)
//   isEmpty:        Θ(1)
//   size:           Θ(n)
//   union:          Θ(1)

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.FibonacciHeap = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.FibonacciHeap = factory();
  }
}(this, function () {
  'use strict';

  var FibonacciHeap = function (customCompare) {
    this.minNode = undefined;
    this.nodeCount = 0;

    if (customCompare) {
      this.compare = customCompare;
    }
  };

  FibonacciHeap.prototype.clear = function () {
    this.minNode = undefined;
    this.nodeCount = 0;
  };

  FibonacciHeap.prototype.decreaseKey = function (node, newKey) {
    // Create a temp node for comparison
    if (this.compare(new Node(newKey, undefined), node.key) > 0) {
      throw "New key is larger than old key.";
    }

    node.key = newKey;
    var parent = node.parent;
    if (parent && this.compare(node, parent) < 0) {
      cut(node, parent, this.minNode, this.compare);
      cascadingCut(parent, this.minNode, this.compare);
    }
    if (this.compare(node, this.minNode) < 0) {
      this.minNode = node;
    }
  };

  FibonacciHeap.prototype.delete = function (node) {
    // This is a special implementation of decreaseKey that sets the
    // argument to the minimum value. This is necessary to make generic keys
    // work, since there is no MIN_VALUE constant for generic types.
    node.isMinimum = true;
    var parent = node.parent;
    if (parent) {
      cut(node, parent, this.minNode, this.compare);
      cascadingCut(parent, this.minNode, this.compare);
    }
    this.minNode = node;

    this.extractMinimum();
  };

  FibonacciHeap.prototype.extractMinimum = function () {
    var extractedMin = this.minNode;
    if (extractedMin) {
      // Set parent to undefined for the minimum's children
      if (extractedMin.child) {
        var child = extractedMin.child;
        do {
          child.parent = undefined;
          child = child.next;
        } while (child !== extractedMin.child);
      }

      var nextInRootList = (this.minNode.next === this.minNode ? undefined : this.minNode.next);

      // Remove min from root list
      removeNodeFromList(extractedMin);
      this.nodeCount--;

      // Merge the children of the minimum node with the root list
      this.minNode = mergeLists(nextInRootList, extractedMin.child, this.compare);
      if (nextInRootList) {
        this.minNode = nextInRootList;
        this.minNode = consolidate(this.minNode, this.compare);
      }
    }
    return extractedMin;
  };

  FibonacciHeap.prototype.findMinimum = function () {
    return this.minNode;
  };

  FibonacciHeap.prototype.insert = function (key, value) {
    var node = new Node(key, value);
    this.minNode = mergeLists(this.minNode, node, this.compare);
    this.nodeCount++;
    return node;
  };

  FibonacciHeap.prototype.isEmpty = function () {
    return this.minNode === undefined;
  };

  FibonacciHeap.prototype.size = function () {
    if (this.isEmpty()) {
      return 0;
    }
    return getNodeListSize(this.minNode);
  };

  // Union another fibonacci heap with this one
  FibonacciHeap.prototype.union = function (other) {
    this.minNode = mergeLists(this.minNode, other.minNode, this.compare);
    this.nodeCount += other.nodeCount;
  };

  FibonacciHeap.prototype.compare = function (a, b) {
    if (a.key > b.key) {
      return 1;
    }
    if (a.key < b.key) {
      return -1;
    }
    return 0;
  };

  function cut(node, parent, minNode, compare) {
    removeNodeFromList(node);
    parent.degree--;
    minNode = mergeLists(minNode, node, compare);
    node.isMarked = false;
    return minNode;
  }

  function cascadingCut(node, minNode, compare) {
    var parent = node.parent;
    if (parent) {
      if (node.isMarked) {
        minNode = cut(node, parent, minNode, compare);
        minNode = cascadingCut(parent, minNode, compare);
      } else {
        node.isMarked = true;
      }
    }
    return minNode;
  }

  function consolidate(minNode, compare) {
    var aux = [];
    var it = new NodeListIterator(minNode);
    while (it.hasNext()) {
      var current = it.next();

      // If there exists another node with the same degree, merge them
      while (aux[current.degree]) {
        if (compare(current, aux[current.degree]) > 0) {
          var temp = current;
          current = aux[current.degree];
          aux[current.degree] = temp;
        }
        linkHeaps(aux[current.degree], current, compare);
        aux[current.degree] = undefined;
        current.degree++;
      }

      aux[current.degree] = current;
    }

    minNode = undefined;
    for (var i = 0; i < aux.length; i++) {
      if (aux[i]) {
        // Remove siblings before merging
        aux[i].next = aux[i];
        aux[i].prev = aux[i];
        minNode = mergeLists(minNode, aux[i], compare);
      }
    }
    return minNode;
  }

  function removeNodeFromList(node) {
      var prev = node.prev;
      var next = node.next;
      prev.next = next;
      next.prev = prev;

      node.next = node;
      node.prev = node;
  }

  function linkHeaps(max, min, compare) {
    removeNodeFromList(max);
    min.child = mergeLists(max, min.child, compare);
    max.parent = min;
    max.isMarked = false;
  }

  // Merges two lists and returns the minimum node
  function mergeLists(a, b, compare) {
    if (!a && !b) {
      return undefined;
    }
    if (!a) {
      return b;
    }
    if (!b) {
      return a;
    }

    var temp = a.next;
    a.next = b.next;
    a.next.prev = a;
    b.next = temp;
    b.next.prev = b;

    return compare(a, b) < 0 ? a : b;
  }

  function getNodeListSize(node) {
    var count = 0;
    var current = node;

    do {
      count++;
      if (current.child) {
        count += getNodeListSize(current.child);
      }
      current = current.next;
    } while (current !== node);

    return count;
  }

  function Node(key, value) {
    this.key = key;
    this.value = value;
    this.prev = this;
    this.next = this;
    this.degree = 0;

    this.parent = undefined;
    this.child = undefined;
    this.isMarked = undefined;
    this.isMinimum = undefined;
  }

  // This Iterator is used to simplify the consolidate() method. It works by
  // gathering a list of the nodes in the list in the constructor since the
  // nodes can change during consolidation.
  var NodeListIterator = function (start) {
    if (!start) {
      return;
    }

    this.items = [];
    var current = start;
    do {
      this.items.push(current);
      current = current.next;
    } while (start !== current);
  };

  NodeListIterator.prototype.hasNext = function () {
    return this.items.length > 0;
  };

  NodeListIterator.prototype.next = function () {
    return this.items.shift();
  };

  return FibonacciHeap;
}));
