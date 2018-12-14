const SERIAL = 6548;

function power(x, y, serial = SERIAL) {
  const rackID = x + 10;
  let power = rackID * y;

  power += serial;
  power *= rackID;
  power = Math.floor(power / 100) % 10;

  return power - 5;
}

function powerXxY(grid, left, top, size) {
  let total = 0;

  for (let y = top; y < top + size; ++y) {
    for (let x = left; x < left + size; ++x) {
      total += grid[y][x];
    }
  }

  return total;
}

const grid = new Array(301).fill(0).map(() => new Array(301));

for (let y = 1; y <= 300; ++y) {
  for (let x = 1; x <= 300; ++x) {
    grid[y][x] = power(x, y, 6548);
  }
}

console.log('Grid built');

let maxN = { x: 0, y: 0, size: 0, power: -100000000 };

for (let size = 2; size < 298; ++size) {
  for (let y = 1; y <= 301 - size; ++y) {
    for (let x = 1; x <= 301 - size; ++x) {
      const powerN = powerXxY(grid, x, y, size);

      if (powerN > maxN.power) {
        maxN = {
          x,
          y,
          size,
          power: powerN
        };

        console.log(maxN);
      }
    }
  }
}

console.log({ maxN });
