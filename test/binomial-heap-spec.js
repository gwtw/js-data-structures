var HeapTests = require("./helpers/heap-tests");
var BinomialHeap = require("../src/binomial-heap");

describe("binomial-heap", function () {
  HeapTests(BinomialHeap);
});
