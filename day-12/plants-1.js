const fs = require('fs');

function loadPlants(fn = 'input.txt') {
  const text = fs.readFileSync(fn, 'utf8');
  const lines = text.split(/\n/).filter(line => line.length > 0);

  let [_, initial] = lines.shift().match(/state: (.*)$/);
  const rules = [];

  const current = [0, 0, 0, 0, ...convertFromHashes(initial), 0, 0, 0];

  lines.forEach(line => {
    const [_, rule, outcome] = line.match(/(.....) => (.)/);
    rules.push({
      condition: convertFromHashes(rule),
      result: convertFromHashes(outcome)
    });
  });

  return { current, rules };
}

function convertFromHashes(str) {
  const retval = [];

  for (let ch of str) retval.push(ch === '#' ? 1 : 0);

  return retval;
}

function plantsToHashes(plants) {
  const { current } = plants;
  let output = `
    0         1         2         3         4 
----0---------0---------0---------0---------0
`;

  for (let plant of current) {
    output += plant ? '#' : '.';
  }

  return output;
}

function generation(plants) {
  let { current, rules } = plants;
  current = [...current, 0, 0];
  const next = [...current];

  for (let idx = 2; idx < current.length - 2; ++idx) {
    for (let rule of rules) {
      const result = applyRule(current.slice(idx - 2, idx + 3), rule);
      if (result !== -1) {
        next[idx] = result;
        break;
      }
    }
  }

  return Object.assign(plants, { current: next });
}

// Return -1 for no match, 0 for no plant, or 1 for plant

function applyRule(slice, rule) {
  const { condition, result } = rule;

  for (let idx = 0; idx < condition.length; ++idx) {
    if (slice[idx] !== condition[idx]) return -1;
  }

  return result;
}

let plants = loadPlants('example.txt');

console.log(plantsToHashes(plants));

//for (let i = 0; i < 20; ++i) {
plants = generation(plants);
//}

console.log(plantsToHashes(plants));
