# js-data-structures

[![Build Status](https://secure.travis-ci.org/Tyriar/js-data-structures.png)](http://travis-ci.org/Tyriar/js-data-structures)
[![Code Climate](https://codeclimate.com/github/Tyriar/js-data-structures.png)](https://codeclimate.com/github/Tyriar/js-data-structures)
[![Code Climate](https://codeclimate.com/github/Tyriar/js-data-structures/coverage.png)](https://codeclimate.com/github/Tyriar/js-data-structures)

A collection of data structures written in JavaScript. Each data structure is enclosed in its own file, wrapped in a [Universal Module Definition (UMD)][1] API to make it easier to use across multiple platforms.

To learn more about how each data structure is implemented have a look at the [technical articles on my blog][2].

## Installing

**Bower**

```
bower install --save js-data-structures
```

**NPM**

```
npm install --save js-data-structures
```

## Including

**Browser**

```javascript
<script src="bower_components/js-data-structures/src/fibonacci-heap.js"></script>
```

**Node.JS**

```javascript
var FibonacciHeap = require("fibonacci-heap");
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

```
npm install
npm test

# generate coverage report in ./coverage/
grunt coverage
```

## See also

* [Tyriar/js-sorting][4]



[1]: https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
[2]: http://www.growingwiththeweb.com/p/explore.html?t=Data%20structure
[3]: https://github.com/Tyriar/js-data-structures/tree/master/src
[4]: https://github.com/Tyriar/js-sorting
[5]: https://github.com/Tyriar/js-data-structures/blob/master/src/fibonacci-heap.js
