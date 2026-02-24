const assert = require('assert');
const { knightMoves } = require('./knight');

function isKnightMove(a, b) {
  const dx = Math.abs(a[0] - b[0]);
  const dy = Math.abs(a[1] - b[1]);
  const arr = [dx, dy].sort((x, y) => x - y);
  return arr[0] === 1 && arr[1] === 2;
}

console.log('Running tests...');

// same square
assert.deepStrictEqual(knightMoves([0, 0], [0, 0]), [[0, 0]]);

// one move
assert.deepStrictEqual(knightMoves([0, 0], [1, 2]), [[0, 0], [1, 2]]);

// path validity and endpoints
let path = knightMoves([0, 0], [3, 3]);
assert.deepStrictEqual(path[0], [0, 0]);
assert.deepStrictEqual(path[path.length - 1], [3, 3]);
for (let i = 0; i < path.length - 1; i++) {
  assert.ok(isKnightMove(path[i], path[i + 1]));
}

const pairs = [
  [[0, 0], [7, 7]],
  [[3, 3], [4, 3]],
  [[1, 1], [6, 2]],
];
for (const [s, e] of pairs) {
  path = knightMoves(s, e);
  assert.deepStrictEqual(path[0], s);
  assert.deepStrictEqual(path[path.length - 1], e);
  for (let i = 0; i < path.length - 1; i++) {
    assert.ok(isKnightMove(path[i], path[i + 1]));
  }
}

console.log('All tests passed.');
