var heapTests = require('./helpers/heap-tests');
var heapHeavyTests = require('./helpers/heap-heavy-tests');
var BinaryHeap = require('../src/binary-heap');

describe('binary-heap', function () {
  'use strict';

  heapTests(BinaryHeap);
  heapHeavyTests(BinaryHeap);
});
