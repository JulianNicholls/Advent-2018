const fs = require('fs');

function loadTimeline() {
  const text = fs.readFileSync('./input.txt', 'utf8');
  const lines = text.split(/\n/).filter(line => line.length > 0);
  const entries = [];

  lines.forEach(line => {
    const [_, date, time, event] = line.match(
      /^\[1518-(\d\d-\d\d) (\d\d:\d\d)\] (.*)$/
    );

    entries.push(`${date} ${time} ${event}`);
  });

  return entries.sort();
}

function collectGuardTime(entries) {
  let num = 0;
  const guards = {};

  entries.forEach(entry => {
    const guardMatch = entry.match(/Guard #(\d{1,4})/);

    if (guardMatch) num = parseInt(guardMatch[1]);
    else {
      const sleepMatch = entry.match(/00:(\d{2}) .*(sleep|wake)/);
      if (!sleepMatch) console.log({ entry, sleepMatch });
      const event = {
        minute: parseInt(sleepMatch[1], 10),
        type: sleepMatch[2]
      };

      if (!guards[num]) guards[num] = [event];
      else guards[num].push(event);
    }
  });

  return guards;
}

function flattenGuards(guards) {
  const guardSleeps = {};

  for (let num in guards) {
    guardSleeps[num] = new Array(60).fill(0);

    for (let idx = 0; idx < guards[num].length; idx += 2) {
      const start = guards[num][idx].minute;
      const end = guards[num][idx + 1].minute;

      for (let min = start; min < end; ++min) {
        ++guardSleeps[num][min];
      }
    }
  }

  return guardSleeps;
}

function totalGuards(times) {
  const totals = {};
  let maxSleep = { num: 0, value: 0 };

  for (let num in times) {
    totals[num] = times[num].reduce((acc, min) => acc + min);

    if (totals[num] > maxSleep.value) {
      maxSleep = { num, value: totals[num] };
    }
  }

  const highestFrequency = Math.max(...times[maxSleep.num]);
  const minute = times[maxSleep.num].indexOf(highestFrequency);

  return {
    totals,
    maxSleep,
    highestFrequency,
    minute
  };
}

const entries = loadTimeline();
console.log('Entries:', entries.length);

const guards = collectGuardTime(entries);
console.log('Guards:', Object.keys(guards).length);

const times = flattenGuards(guards);
console.log('Times:', Object.keys(times).length);

const result = totalGuards(times);
console.log(result);
