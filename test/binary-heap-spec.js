var HeapTests = require("./helpers/heap-tests");
var HeapHeavyTests = require("./helpers/heap-heavy-tests");
var BinaryHeap = require("../src/binary-heap");

describe("binary-heap", function () {
  HeapTests(BinaryHeap);
  HeapHeavyTests(BinaryHeap);
});
