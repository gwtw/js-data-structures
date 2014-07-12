module.exports = function (Heap) {
  'use strict';

  var heap;

  beforeEach(function () {
    heap = new Heap();
  });

  describe('when inserting 1000 in-order elements', function () {
    beforeEach(function () {
      for (var i = 0; i < 1000; i++) {
        heap.insert(i, i);
      }
    });

    describe('then extracting 1000 elements', function () {
      beforeEach(function () {
        for (var i = 0; i < 1000; i++) {
          heap.extractMinimum();
        }
      });

      it('should give an empty heap', function () {
        expect(heap.isEmpty()).toBe(true);
      });
    });
  });

  describe('when inserting 1000 reversed elements', function () {
    beforeEach(function () {
      for (var i = 0; i < 1000; i++) {
        heap.insert(i, i);
      }
    });

    describe('then extracting 1000 elements', function () {
      beforeEach(function () {
        for (var i = 0; i < 1000; i++) {
          heap.extractMinimum();
        }
      });

      it('should give an empty heap', function () {
        expect(heap.isEmpty()).toBe(true);
      });
    });
  });

  describe('when inserting 1000 pseudo-randomised elements', function () {
    beforeEach(function () {
      for (var i = 0; i < 1000; i++) {
        if (i % 2 === 0) {
          heap.insert(i, i);
        } else {
          heap.insert(999 - i, 999 - i);
        }
      }
    });

    describe('then extracting 1000 elements', function () {
      beforeEach(function () {
        for (var i = 0; i < 1000; i++) {
          heap.extractMinimum();
        }
      });

      describe('then extracting 1000 elements', function () {
        beforeEach(function () {

        });

        it('should give an empty heap', function () {
          expect(heap.isEmpty()).toBe(true);
        });
      });
    });
  });

  if (Heap.prototype.decreaseKey) {
    describe('when inserting, decreasing a key, then extracting', function () {
      it('should be able to remove all elements', function () {
        var i;
        var nodes = [];
        for (i = 0; i < 1000; i++) {
          nodes.push(heap.insert(i, i));
        }

        heap.decreaseKey(nodes[20], -10);

        for (i = 500; i < 1500; i++) {
          heap.insert(i, i);
        }

        for (i = 0; i < 2000; i++) {
          heap.extractMinimum();
        }
        expect(heap.isEmpty()).toBe(true);
      });
    });

    describe('when inserting, decreasing multiple keys, then extracting', function () {
      it('should be able to remove all elements', function () {
        var i;
        var nodes = [];
        for (i = 0; i < 1000; i++) {
          nodes.push(heap.insert(i, i));
        }

        for (i = 0; i < 1000; i+=50) {
          heap.decreaseKey(nodes[i], -i - 5);
        }

        for (i = 500; i < 1500; i++) {
          heap.insert(i, i);
        }

        for (i = 0; i < 2000; i++) {
          heap.extractMinimum();
        }
        expect(heap.isEmpty()).toBe(true);
      });
    });
  }

  it('should handle 1000 shuffled elements', function () {
    var i;
    var input = [];
    for (i = 0; i < 1000; i++) {
      input.push(i);
    }
    // shuffle
    for (i = 0; i < 1000; i++) {
      var swapWith = Math.floor(Math.random() * 1000);
      var temp = input[i];
      input[i] = input[swapWith];
      input[swapWith] = temp;
    }
    // insert
    for (i = 0; i < 1000; i++) {
      heap.insert(input[i], null);
    }
    // extract
    var output = [];
    var errorReported = false;
    var counter = 0;
    while (!heap.isEmpty()) {
      output.push(heap.extractMinimum().key);
      if (!errorReported && counter !== output[output.length - 1]) {
        expect('the heap property was not maintained').toBe('0, 1, 2, ..., 997, 998, 999');
        errorReported = true;
      }
      counter++;
    }
    expect(output.length).toBe(1000);
  });
};
