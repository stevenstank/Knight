"use strict";

const KNIGHT_MOVES = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
];

function inBounds(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function key(x, y) {
  return `${x},${y}`;
}

function parsePos(pos) {
  if (!Array.isArray(pos) || pos.length < 2) throw new Error('position must be [x,y]');
  return [Number(pos[0]), Number(pos[1])];
}

function knightMoves(start, end) {
  const s = parsePos(start);
  const e = parsePos(end);
  const sk = key(s[0], s[1]);
  const ek = key(e[0], e[1]);

  if (sk === ek) return [[s[0], s[1]]];

  const queue = [s];
  const visited = new Set([sk]);
  const parent = new Map();

  for (let qi = 0; qi < queue.length; qi++) {
    const cur = queue[qi];
    for (const [dx, dy] of KNIGHT_MOVES) {
      const nx = cur[0] + dx;
      const ny = cur[1] + dy;
      if (!inBounds(nx, ny)) continue;
      const k = key(nx, ny);
      if (visited.has(k)) continue;
      parent.set(k, key(cur[0], cur[1]));
      if (k === ek) {
        const path = [];
        let curk = k;
        while (curk) {
          const [xs, ys] = curk.split(',');
          path.push([Number(xs), Number(ys)]);
          curk = parent.get(curk);
        }
        path.reverse();
        return path;
      }
      visited.add(k);
      queue.push([nx, ny]);
    }
  }

  return [];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { knightMoves };
}

if (require.main === module) {
  const argv = process.argv.slice(2).map(Number);
  if (argv.length >= 4) {
    const [sx, sy, ex, ey] = argv;
    const path = knightMoves([sx, sy], [ex, ey]);
    if (path.length === 0) {
      console.log('No path found');
    } else {
      console.log(`You made it in ${path.length - 1} moves!  Here's your path:`);
      path.forEach((p) => console.log(p));
    }
  } else {
    const path = knightMoves([3, 3], [4, 3]);
    console.log(`You made it in ${path.length - 1} moves!  Here's your path:`);
    path.forEach((p) => console.log(p));
  }
}
