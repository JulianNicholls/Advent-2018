const fs = require('fs');

function loadTimeline() {
  const text = fs.readFileSync('./input.txt', 'utf8');
  const lines = text.split(/\n/).filter(line => line.length > 0);
  const entries = {};

  lines.forEach(line => {
    const [_, date, hour, minute] = line.match(
      /^\[1518-(\d\d-\d\d) (\d\d):(\d\d)/
    );
    const event = line.substr(19);

    if (hour === '00') {
      if (entries[date])
        entries[date].push({ minute: parseInt(minute, 10), event });
      else entries[date] = [{ minute: parseInt(minute, 10), event }];
    }
  });

  for (key in entries) {
    entries[key] = entries[key].sort((a, b) => a.minute - b.minute);
  }

  return entries;
}

const entries = loadTimeline();

console.log('Entries:', entries.length);
console.log('An entry:', entries['11-08']);

for (key in entries) {
  //  if (!entries[key][0].event.test(/Guard #\d{1,4}/)) {
  console.log(key, entries[key][0]);
  //  }
}
