const fs = require('fs');

const polymer = fs.readFileSync('./input.txt', 'utf8');

function react(polymer) {
  let reacted = false;
  let newPolymer = '';

  for (let i = 0; i < polymer.length; ++i) {
    if (
      i < polymer.length - 1 &&
      polymer[i].toLowerCase() === polymer[i + 1].toLowerCase() &&
      polymer[i] !== polymer[i + 1]
    ) {
      // console.log(polymer[i], polymer[i + 1]);
      ++i;
      reacted = true;
    } else if (polymer[i] !== '\n') newPolymer += polymer[i];
  }

  return { polymer: newPolymer, reacted };
}

let result = react(polymer);

while (result.reacted) {
  console.log(
    `Polymer: ${result.polymer.substr(0, 60)}... length: ${result.polymer.length}`
  );
  result = react(result.polymer);
}

console.log(
  `Polymer: ${result.polymer.substr(0, 60)}... length: ${result.polymer.length}`
);
