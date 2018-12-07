const fs = require('fs');

function loadConstraints() {
  const constraints = {};

  const text = fs.readFileSync('./input.txt', 'utf8');
  const lines = text.split(/\n/).filter(line => line.length > 0);

  lines.forEach(line => {
    const [_, required, stalled] = line.match(/Step (\w).* step (\w)/);

    console.log({ required, stalled });

    if (!constraints[stalled]) {
      constraints[stalled] = [required];
    } else constraints[stalled].push(required);

    if (!constraints[required]) constraints[required] = [];
  });

  return constraints;
}

const constraints = loadConstraints();

console.log(constraints);

let done;
let schedule = '';

while (!done) {
  done = true;

  Object.keys(constraints)
    .sort()
    .forEach(task => {
      if (done && constraints[task].length == 0) {
        // Ready
        schedule += task;
        done = false;
        delete constraints[task];

        for (let undoneTask in constraints) {
          const index = constraints[undoneTask].indexOf(task);
          if (index !== -1) {
            constraints[undoneTask].splice(index, 1);
          }
        }
      }
    });

  console.log({ schedule });
}

console.log({ schedule, constraints });
