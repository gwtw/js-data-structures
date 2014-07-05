var HeapTests = require("./helpers/heap-tests");
var HeapHeavyTests = require("./helpers/heap-heavy-tests");
var BinomialHeap = require("../src/binomial-heap");

describe("binomial-heap", function () {
  HeapTests(BinomialHeap);
  HeapHeavyTests(BinomialHeap);
});
