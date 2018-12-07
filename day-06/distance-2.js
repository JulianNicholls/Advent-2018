const fs = require('fs');

function loadCoordinates() {
  const text = fs.readFileSync('./input.txt', 'utf8');
  const lines = text.split(/\n/).filter(line => line.length > 0);

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

const coordinates = loadCoordinates();

const { x: xMax, y: yMax } = gridSize(coordinates);

let regionSize = 0;

for (let row = 0; row < yMax; ++row) {
  for (let col = 0; col < xMax; ++col) {
    const distance = coordinates.reduce(
      (acc, coord) => acc + Math.abs(row - coord.y) + Math.abs(col - coord.x),
      0
    );

    if (distance < 10000) {
      ++regionSize;
    }
  }
}

console.log({ regionSize });
