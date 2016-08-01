# js-data-structures

[![Build Status](https://travis-ci.org/gwtw/js-data-structures.svg?branch=master)](http://travis-ci.org/gwtw/js-data-structures)

A collection of data structures written in JavaScript.

Detailed information on the complexity of each data structure is located [here][3]. To learn more about how some of the data structures are implemented, check out the [technical articles on Growing with the Web](http://www.growingwiththeweb.com/p/explore.html?t=Data%20structure)..

## Installing

```bash
npm install --save js-data-structures
```

## Including

```javascript
var FibonacciHeap = require("js-data-structures").FibonacciHeap;
```

## Usage

See [the source files][3] for a list of public interfaces on each data structure, here is an example for the [Fibonacci heap][5].

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



  [3]: lib
  [4]: https://github.com/gwtw/js-sorting
  [5]: lib/fibonacci-heap.js
