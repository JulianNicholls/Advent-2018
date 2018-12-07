const fs = require('fs');

function loadCoordinates() {
  const text = fs.readFileSync('./input.txt', 'utf8');
  const lines = text.split(/\n/).filter(line => line.length > 0);

  //  const lines = ['1, 1', '1, 6', '8, 3', '3, 4', '5, 5', '8, 9'];

  return lines.map(line => {
    const coMatch = line.match(/(\d{1,3}), (\d{1,3})/);

    return { x: parseInt(coMatch[1], 10), y: parseInt(coMatch[2], 10) };
  });
}

function gridSize(coordinates) {
  const max = { x: 0, y: 0 };

  coordinates.forEach(({ x, y }) => {
    if (x >= max.x) max.x = x + 1;
    if (y >= max.y) max.y = y + 1;
  });

  return max;
}

function line(row) {
  let line = '';

  row.forEach(cell => {
    line += cell === -1 ? '.' : String.fromCharCode(cell + 97);
  });

  return line;
}

const coordinates = loadCoordinates();

const { x: xMax, y: yMax } = gridSize(coordinates);

console.log({ xMax, yMax });

const map = new Array(yMax).fill(-1).map(() => new Array(xMax).fill(-1));

for (let row = 0; row < yMax; ++row) {
  for (let col = 0; col < xMax; ++col) {
    let min = { num: 0, dist: xMax + yMax + 1, dup: false };

    for (let idx = 0; idx < coordinates.length; ++idx) {
      const coord = coordinates[idx];
      const dist = Math.abs(row - coord.y) + Math.abs(col - coord.x);

      if (dist === min.dist) {
        min.dup = true;
      } else if (dist < min.dist) min = { dist, num: idx, dup: false };
    }

    if (!min.dup) map[row][col] = min.num;
  }
}

// map.forEach(row => console.log(line(row)));

const sizes = new Array(coordinates.length).fill(0);

for (let row = 0; row < yMax; ++row) {
  for (let col = 0; col < xMax; ++col) {
    const nearest = map[row][col];

    if (nearest !== -1) ++sizes[nearest];
  }
}

//console.log({ sizes });

for (let x = 0; x < xMax; ++x) {
  const top = map[0][x];
  const bottom = map[yMax - 1][x];

  sizes[top] = 0;
  sizes[bottom] = 0;
}

for (let y = 0; y < yMax; ++y) {
  const left = map[y][0];
  const right = map[y][xMax - 1];

  sizes[left] = 0;
  sizes[right] = 0;
}

console.log({ sizes });
const largest = Math.max(...sizes);

console.log({ largest });
