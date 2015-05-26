var heapTests = require('./helpers/heap-tests');
var heapHeavyTests = require('./helpers/heap-heavy-tests');
var BinomialHeap = require('../index').BinomialHeap;

describe('binomial-heap', function () {
  'use strict';

  heapTests(BinomialHeap);
  heapHeavyTests(BinomialHeap);
});
