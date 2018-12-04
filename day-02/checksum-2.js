const fs = require('fs');

function loadIDs() {
  const text = fs.readFileSync('./input-1.txt', 'utf8');
  const lines = text.split(/\n/);

  return lines.filter(line => line.length > 0);
}

function buildSections(lines) {
  return lines.reduce((acc, line) => {
    const initial = line[0];

    if (acc[initial]) acc[initial].push(line);
    else acc[initial] = [line];

    return acc;
  }, {});
}

function diff(left, right) {
  let diffs = 0;

  for (let i = 0; i < left.length; ++i)
    if (left[i] !== right[i]) {
      ++diffs;
    }

  return diffs;
}

function checkSection(section) {
  for (let left = 0; left < section.length - 1; ++left) {
    for (let right = left + 1; right < section.length; ++right) {
      if (diff(section[left], section[right]) === 1)
        console.log(`${section[left]}\n${section[right]}`);
    }
  }
}

const lines = loadIDs();
const sections = buildSections(lines);

console.log('lines:', lines.length);
console.log('sections:', Object.keys(sections).length);

Object.keys(sections).forEach(key => checkSection(sections[key]));
