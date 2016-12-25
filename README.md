# js-data-structures

[![Build Status](https://travis-ci.org/gwtw/js-data-structures.svg?branch=master)](http://travis-ci.org/gwtw/js-data-structures)

A collection of data structures written in JavaScript.

Detailed information on the complexity of each data structure is located [here](lib). To learn more about how some of the data structures are implemented, check out the [technical articles on Growing with the Web](http://www.growingwiththeweb.com/p/explore.html?t=Data%20structure).

## Installing

```bash
npm install --save js-data-structures
```

## Including

```javascript
var AvlTree = require('js-data-structures').AvlTree;
var BinaryHeap = require('js-data-structures').BinaryHeap;
var BinarySearchTree = require('js-data-structures').BinarySearchTree;
var BinomialHeap = require('js-data-structures').BinomialHeap;
var FibonacciHeap = require('js-data-structures').FibonacciHeap;
var RedBlackTree = require('js-data-structures').RedBlackTree;
var SplayTree = require('js-data-structures').SplayTree;
```

## Usage

See [the source files](lib) and [`dependencies` in package.json](https://github.com/gwtw/js-data-structures/blob/master/package.json) for a list of public interfaces on each data structure, here is an example for the [Fibonacci heap](https://github.com/gwtw/js-fibonacci-heap).

```javascript
var heap = new FibonacciHeap();
heap.insert(3);
heap.insert(7);
heap.insert(8);
heap.insert(1);
heap.insert(2);

while (!heap.isEmpty()) {
  console.log(heap.extractMinimum());
}
```


## Contributing

I'd love to get some contributions for other data structures, if you want to make a pull request try to follow the existing style of the code and make sure you add tests for the new data structure.

### Testing locally

```bash
npm install
npm test

# generate coverage report in ./coverage/
grunt coverage
```



## License

MIT © [Daniel Imms](http://www.growingwiththeweb.com)



## See also

* [js-design-patterns](https://github.com/gwtw/js-design-patterns)
* [js-interview-questions](https://github.com/gwtw/js-interview-questions)
* [js-sorting](https://github.com/gwtw/js-sorting)
