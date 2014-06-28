var HeapTests = require("./helpers/heap-tests");
var FibonacciHeap = require("../src/fibonacci-heap");

describe("fibonacci-heap", function () {
  HeapTests(FibonacciHeap);
});
