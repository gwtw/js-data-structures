## Heaps

| Algorithm              | File      | buildHeap | clear  | decreaseKey | delete     | extractMinimum | findMinimum | insert   | isEmpty | size | union    |
|------------------------|-----------|-----------|--------|-------------|------------|----------------|-------------|----------|---------|------|----------|
| [Binary heap][01_a]    | [1][01_1] | Θ(n)      | Θ(1)   | Θ(log n)    | Θ(log n)   | Θ(log n)       | Θ(1)        | Θ(log n) | Θ(1)    | Θ(1) | Θ(n)     |
| [Binomial heap][02_a]  | [1][02_1] |           | Θ(1)   |             |            | Θ(log n)       | O(log n)\*  | O(log n) | Θ(1)    | Θ(1) | Θ(log n) |
| [Fibonacci heap][03_a] | [1][03_1] |           | Θ(1)\* | Θ(1)\*      | O(log n)\* | O(log n)\*     | Θ(1)        | Θ(1)     | Θ(1)    | Θ(n) | Θ(1)    |

\* amortised

  [01_a]: http://www.growingwiththeweb.com/data-structures/binary-heap/overview/
  [01_1]: https://github.com/gwtw/js-data-structures/blob/master/src/binary-heap.js
  [02_a]: http://www.growingwiththeweb.com/data-structures/binomial-heap/overview/
  [02_1]: https://github.com/gwtw/js-data-structures/blob/master/src/binomial-heap.js
  [03_a]: http://www.growingwiththeweb.com/data-structures/fibonacci-heap/overview/
  [03_1]: https://github.com/gwtw/js-data-structures/blob/master/src/fibonacci-heap.js

## Trees

| Algorithm                   | File       | add        | contains   | findMaximum | findMinimum | isEmpty | remove     | traverse* | size |
|-----------------------------|------------|------------|------------|-------------|-------------|---------|------------|-----------|------|
| [Binary search tree][d01_a] | [1][d01_1] | O(n)\*\*   | O(n)\*\*   | O(n)\*\*    | O(n)\*\*    | Θ(1)    | O(n)\*\*   | Θ(n)      | Θ(1) |
| [Splay tree][d02_a]         | [1][d02_1] | O(log n)\* | O(log n)\* | O(n)\*\*    | O(n)\*\*    | Θ(1)    | O(log n)\* | Θ(n)      | Θ(1) |

\* amortised<br>
\*\* O(log n) average

  [d01_a]: http://www.growingwiththeweb.com/data-structures/binary-search-tree/overview/
  [d01_1]: https://github.com/gwtw/js-data-structures/blob/master/src/binary-search-tree.js
  [d02_a]: http://www.growingwiththeweb.com/data-structures/splay-tree/overview/
  [d02_1]: https://github.com/gwtw/js-data-structures/blob/master/src/splay-tree.js
