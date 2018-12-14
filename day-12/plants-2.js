const fs = require('fs');

function loadPlants(fn = 'input.txt') {
  const text = fs.readFileSync(fn, 'utf8');
  const lines = text.split(/\n/).filter(line => line.length > 0);

  let [_, initial] = lines.shift().match(/state: (.*)$/);
  const rules = [];

  const plants = `....${initial}...`;

  lines.forEach(line => {
    const [_, condition, result] = line.match(/(.....) => (.)/);
    rules.push({
      condition,
      result
    });
  });

  return { plants, rules };
}

function header() {
  return `
             0         1         2         3         4 
     --------0---------0---------0---------0---------0
`;
}

function generation(plants, rules) {
  let current = plants + '..';
  let next = '..';

  if (current[2] === '#' || current[3] === '#') {
    next += '....';
    left -= 4;
    console.log({ left });
  }

  if (current.slice(0, 12) === '............') {
    current = current.slice(4);
    left += 4;
    //    console.log({ left });
  }

  for (let idx = 2; idx < current.length - 2; ++idx) {
    const slice = current.slice(idx - 2, idx + 3);
    let found = false;

    for (let rule of rules) {
      if (rule.condition === slice) {
        next += rule.result;
        // console.log({ next, idx, res: rule.result });
        found = true;
        break;
      }
    }

    if (!found) {
      next += '.';
      // console.log({ next, idx, res: '.' });
    }
  }

  if (next[next.length - 1] === '#') next += '..';

  return next;
}

function total(plants) {
  let total = 0;
  let potnum = left;

  for (const ch of plants) {
    if (ch === '#') total += potnum;

    ++potnum;
  }

  return total;
}

let { plants, rules } = loadPlants();
let left = -4;

console.log(header(), ' 0:', plants);

for (let i = 1; i <= 100000; ++i) {
  let gen = ` ${i}:`;
  if (gen.length === 3) gen = ' ' + gen;

  plants = generation(plants, rules);

  if (i % 10000 === 0) {
    console.log(gen, plants, total(plants));
  }
}

console.log({ total: total(plants) });
