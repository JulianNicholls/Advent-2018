const fs = require('fs');

function loadClaims() {
  const text = fs.readFileSync('./input.txt', 'utf8');
  const lines = text.split(/\n/).filter(line => line.length > 0);
  const claims = [];

  lines.forEach(line => {
    const parts = line.split(/\s*[@:x#,]\s*/);
    claims.push({
      left: parseInt(parts[2], 10),
      top: parseInt(parts[3], 10),
      width: parseInt(parts[4], 10),
      height: parseInt(parts[5], 10)
    });
  });

  return claims;
}

const claims = loadClaims();

console.log('Claims:', claims.length);

let width = 0;
let height = 0;
let area = 0;

claims.forEach(claim => {
  const cwidth = claim.left + claim.width - 1;
  const cheight = claim.top + claim.height - 1;

  area += claim.width * claim.height;

  if (cwidth > width) {
    width = cwidth;
    if (width > 1000) console.log({ claim, width, height });
  }

  if (cheight > height) {
    height = cheight;
    //    console.log({ claim, width, height });
  }
});

console.log({ width, height, area, used: height * width });

const used = new Array(height + 1)
  .fill(0)
  .map(() => new Array(width + 1).fill(0));

claims.forEach(claim => {
  for (let row = claim.top; row < claim.top + claim.height; ++row)
    for (let col = claim.left; col < claim.left + claim.width; ++col) {
      //      console.log({ row, col });
      ++used[row][col];
    }
});

console.log('Built Map');

let dups = 0,
  non_dups = 0,
  total = 0;

// used.forEach((row, ridx) => {
//   row.forEach((cell, cidx) => {
//     ++total;
//     if (cell > 1) {
//       ++dups;
//       // console.log({ ridx, cidx, cell, dups });
//     } else ++non_dups;
//   });
// });

for (let row = 0; row < used.length; ++row)
  for (let col = 0; col < used[row].length; ++col) {
    //     // if (cell !== 0)
    ++total;
    if (used[row][col] > 1) {
      ++dups;
      // console.log({ ridx, cidx, cell, dups });
    } else ++non_dups;
  }

console.log({ total, dups, non_dups });
