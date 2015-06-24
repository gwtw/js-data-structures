# js-data-structures [![NPM version](http://img.shields.io/npm/v/js-data-structures.svg?style=flat)](https://www.npmjs.org/package/js-data-structures)

[![Build Status](http://img.shields.io/travis/Tyriar/js-data-structures.svg?style=flat)](http://travis-ci.org/Tyriar/js-data-structures)
[![Code Climate](http://img.shields.io/codeclimate/github/Tyriar/js-data-structures.svg?style=flat)](https://codeclimate.com/github/Tyriar/js-data-structures)
[![Code coverage](http://img.shields.io/codeclimate/coverage/github/Tyriar/js-data-structures.svg?style=flat)](https://codeclimate.com/github/Tyriar/js-data-structures)

A collection of data structures written in JavaScript. Each data structure is enclosed in its own file, wrapped in a [Universal Module Definition (UMD)][1] API to make it easier to use across multiple platforms.

Detailed information on the complexity of each data structure is located [here][3]. To learn more about how some of the data structures are implemented, have a look at the [technical articles on my blog][2].

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

* [js-design-patterns](https://github.com/Tyriar/js-design-patterns)
* [js-interview-questions](https://github.com/Tyriar/js-interview-questions)
* [js-sorting](https://github.com/Tyriar/js-sorting)



  [1]: https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
  [2]: http://www.growingwiththeweb.com/p/explore.html?t=Data%20structure
  [3]: lib
  [4]: https://github.com/Tyriar/js-sorting
  [5]: lib/fibonacci-heap.js
