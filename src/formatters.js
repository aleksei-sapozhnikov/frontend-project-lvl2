import _ from 'lodash';

const jsonLikeTypeToSign = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

export const noop = () => {};

const jsonLikeStringifyValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  return [
    '{',
    Object.keys(value)
      .map((key) => `${'    '.repeat(depth + 2)}${key}: ${value[key]}`)
      .join('\n'),
    `${'    '.repeat(depth + 1)}}`,
  ].join('\n');
};

const treeToJsonLikeString = (tree) => {
  const nodeListToString = (node, depth = 0) => [
    '{',
    node.map((n) => {
      const value = n.children.length === 0
        ? jsonLikeStringifyValue(n.value, depth)
        : nodeListToString(n.children, depth + 1);
      return `  ${'    '.repeat(depth)}${jsonLikeTypeToSign[n.type]} ${n.key}: ${value}`;
    }).join('\n'),
    `${'    '.repeat(depth)}}`,
  ].join('\n');
  return nodeListToString(tree);
};

const formatters = [
  {
    type: 'jsonLikeString',
    format: treeToJsonLikeString,
  },
];

export const formatterByType = (type) => formatters.find((f) => f.type === type);
