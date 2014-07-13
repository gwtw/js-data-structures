## Heaps

| Algorithm              | File      | buildHeap | clear  | decreaseKey | delete     | extractMinimum | findMinimum | insert   | isEmpty | size | union    |
|------------------------|-----------|-----------|--------|-------------|------------|----------------|-------------|----------|---------|------|----------|
| [Binary heap][01_a]    | [1][01_1] | Θ(n)      | Θ(1)   | Θ(log n)    | Θ(log n)   | Θ(log n)       | Θ(1)        | Θ(log n) | Θ(1)    | Θ(1) | Θ(n)     |
| [Binomial heap][02_a]  | [1][02_1] |           | Θ(1)   |             |            | Θ(log n)       | O(log n)\*  | O(log n) | Θ(1)    | Θ(1) | Θ(log n) |
| [Fibonacci heap][03_a] | [1][03_1] |           | Θ(1)\* | Θ(1)\*      | O(log n)\* | O(log n)\*     | Θ(1)        | Θ(1)     | Θ(1)    | Θ(n) | Θ(1)    |

\* amortised

  [01_a]: http://www.growingwiththeweb.com/2014/02/bubble-sort.html
  [01_1]: https://github.com/Tyriar/js-data-structures/blob/master/src/binary-heap.js
  [02_a]: http://www.growingwiththeweb.com/2014/01/binomial-heap.html
  [02_1]: https://github.com/Tyriar/js-data-structures/blob/master/src/binomial-heap.js
  [03_a]: http://www.growingwiththeweb.com/2014/06/fibonacci-heap.html
  [03_1]: https://github.com/Tyriar/js-data-structures/blob/master/src/fibonacci-heap.js
