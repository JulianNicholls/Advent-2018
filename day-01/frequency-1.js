const fs = require('fs');

const text = fs.readFileSync('./input-1.txt', 'utf8');
const lines = text.split(/\n/);

console.log('Lines:', lines.length);

const frequency = lines.reduce((acc, line) => {
  const value = parseInt(line, 10);
  return isNaN(value) ? acc : acc + value;
}, 0);

console.log('Kenneth?', frequency);

