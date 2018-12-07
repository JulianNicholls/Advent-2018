const fs = require('fs');

const polymer = fs.readFileSync('./input.txt', 'utf8');

function purge(polymer, purgeUnit) {
  let newPolymer = '';

  for (const unit of polymer)
    if (unit.toUpperCase() !== purgeUnit) newPolymer += unit;

  return newPolymer;
}

function react(polymer) {
  let reacted = false;
  let newPolymer = '';

  for (let i = 0; i < polymer.length; ++i) {
    if (
      i < polymer.length - 1 &&
      polymer[i].toLowerCase() === polymer[i + 1].toLowerCase() &&
      polymer[i] !== polymer[i + 1]
    ) {
      ++i;
      reacted = true;
    } else if (polymer[i] !== '\n') newPolymer += polymer[i];
  }

  return { polymer: newPolymer, reacted };
}

for (let i = 0; i < 26; ++i) {
  const unit = String.fromCharCode(i + 65);
  const polymerToTest = purge(polymer, unit);
  let result = react(polymerToTest);

  while (result.reacted) {
    result = react(result.polymer);
  }

  console.log(`Unit: ${unit}, length: ${result.polymer.length}`);
}
