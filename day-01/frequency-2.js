const fs = require('fs');

const text = fs.readFileSync('./input-1.txt', 'utf8');
const lines = text.split(/\n/);

console.log('Lines:', lines.length);

const seen = [0];
let done = false;
let frequency = 0;
let idx = 0;

while (!done) {
  const value = parseInt(lines[idx++], 10);

  if (isNaN(value)) {
    console.log({ idx, max: Math.max(seen) });
    idx = 0;
  } else {
    frequency += value;
    if (seen.includes(frequency)) done = true;
    else seen.push(frequency);
  }
}

console.log('Duplicate:', frequency);
