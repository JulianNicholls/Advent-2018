const fs = require('fs');

const text = fs.readFileSync('./input.txt', 'utf8');
// const text = fs.readFileSync('./example.txt', 'utf8');
const numbers = text
  .split(/\s/)
  .filter(num => num.length !== 0)
  .map(num => parseInt(num, 10));

// console.log(numbers);

function createNode() {
  const node = { nodes: [], metadata: [] };
  const subnodes = numbers.shift();
  const metadatums = numbers.shift();

  for (let i = 0; i < subnodes; ++i) {
    node.nodes.push(createNode());
  }

  for (let i = 0; i < metadatums; ++i) {
    node.metadata.push(numbers.shift());
  }

  return node;
}

function traverse(node) {
  if (node.nodes.length === 0)
    return node.metadata.reduce((acc, num) => acc + num, 0);

  return node.metadata.reduce((acc, meta) => {
    if (meta !== 0) {
      const idx = meta - 1;
      if (idx < node.nodes.length) return acc + traverse(node.nodes[idx]);
    }

    return acc;
  }, 0);
}

const topNode = createNode();

// console.log(topNode);

const total = traverse(topNode);

console.log({ total });
