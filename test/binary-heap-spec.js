var heapTests = require('./helpers/heap-tests');
var heapHeavyTests = require('./helpers/heap-heavy-tests');
var BinaryHeap = require('../index').BinaryHeap;

describe('binary-heap', function () {
  'use strict';

  heapTests(BinaryHeap);
  heapHeavyTests(BinaryHeap);
});
