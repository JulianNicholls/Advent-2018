const fs = require('fs');

const text = fs.readFileSync('./input-1.txt', 'utf8');
const lines = text.split(/\n/);

function count(line) {
  const counts = line.split('').reduce((acc, ch) => {
    acc[ch] = acc[ch] ? acc[ch] + 1 : 1;
    return acc;
  }, {});

  const incs = Object.keys(counts).reduce(
    (acc, key) => {
      if (counts[key] == 2) acc[0] = 1;
      else if (counts[key] == 3) acc[1] = 1;

      return acc;
    },
    [0, 0]
  );

  return incs;
}

console.log('line 1:', count(lines[0]));

const counts = [0, 0];

lines.forEach(line => {
  if (line !== '') {
    const incs = count(line);

    counts[0] += incs[0];
    counts[1] += incs[1];
  }
});

console.log({ counts }, counts[0] * counts[1]);
