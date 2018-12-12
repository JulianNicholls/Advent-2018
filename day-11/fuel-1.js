const SERIAL = 6548;

function power(x, y, serial = SERIAL) {
  const rackID = x + 10;
  let power = rackID * y;

  power += serial;
  power *= rackID;
  power = Math.floor(power / 100) % 10;

  return power - 5;
}

function power3x3(grid, left, top) {
  let total = 0;

  for (y = top; y < top + 3; ++y) {
    for (x = left; x < left + 3; ++x) {
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

let max = { x: 0, y: 0, power: -100000000 };
let max3 = { x: 0, y: 0, power: -100000000 };

for (let y = 1; y <= 298; ++y) {
  for (let x = 1; x <= 298; ++x) {
    if (grid[y][x] > max.power) {
      max = {
        x,
        y,
        power: grid[y][x]
      };
    }

    const power3 = power3x3(grid, x, y);

    if (power3 > max3.power) {
      max3 = {
        x,
        y,
        power: power3
      };
    }
  }
}

console.log({ max, max3 });
