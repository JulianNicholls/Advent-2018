const fs = require('fs');

function loadStars(fn = 'input.txt') {
  const text = fs.readFileSync(fn, 'utf8');
  const lines = text.split(/\n/).filter(line => line.length > 0);

  const stars = [];

  lines.forEach(line => {
    const [_, px, py, dx, dy] = line.match(
      /=<\s*(-?\d+),\s+(-?\d+).*=<\s*(-?\d+),\s*(-?\d+)/
    );

    stars.push({
      position: { x: parseInt(px, 10), y: parseInt(py, 10) },
      velocity: { x: parseInt(dx, 10), y: parseInt(dy, 10) }
    });
  });

  return stars;
}

function getLimits(stars) {
  const limits = { x: [10000, -10000], y: [10000, -10000] };

  stars.forEach(star => {
    const { x, y } = star.position;

    if (x < limits.x[0]) limits.x[0] = x;
    if (x > limits.x[1]) limits.x[1] = x;

    if (y < limits.y[0]) limits.y[0] = y;
    if (y > limits.y[1]) limits.y[1] = y;
  });

  return limits;
}

function moveStars(stars) {
  const updated = [];

  stars.forEach(star => {
    const { x, y } = star.position;
    const { x: dx, y: dy } = star.velocity;

    updated.push({
      position: { x: x + dx, y: y + dy },
      velocity: { x: dx, y: dy }
    });
  });

  return updated;
}

function isStar(stars, x, y) {
  const length = stars.length;
  let idx = 0;
  let isStar = false;

  while (idx < length) {
    if (stars[idx].position.x === x && stars[idx].position.y === y) {
      isStar = true;
      break;
    }

    ++idx;
  }

  return isStar;
}

function showStars(stars) {
  const limits = getLimits(stars);

  console.log({ limits });

  for (let y = limits.y[0]; y <= limits.y[1]; ++y) {
    if (y === 0) console.log('--------------------------------------------');
    let line = '';

    for (let x = limits.x[0]; x <= limits.x[1]; ++x) {
      if (x === 0) line += '|';
      line += isStar(stars, x, y) ? '#' : '.';
    }

    console.log(line);
  }
}

let stars = loadStars();
let limits = getLimits(stars);
let count = 0;

while (++count < 10900) {
  const prevStars = stars;
  const prevLimits = limits;

  stars = moveStars(stars);
  limits = getLimits(stars);

  if (limits.x[1] - limits.x[0] > prevLimits.x[1] - prevLimits.x[0]) {
    console.log({ count });
    showStars(prevStars);
    break;
  }
}
