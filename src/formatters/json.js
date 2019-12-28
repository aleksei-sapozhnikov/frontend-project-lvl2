import _ from 'lodash';

export const noop = () => {};

const mapTypeToSign = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const stringifyObject = (obj, depth) => Object.keys(obj)
  .map((key) => `${'    '.repeat(depth + 2)}${key}: ${obj[key]}`)
  .join('\n');

const stringifyNodeValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  return [
    '{',
    stringifyObject(value, depth),
    `${'    '.repeat(depth + 1)}}`,
  ].join('\n');
};

export const stringifyTree = (tree) => {
  const stringifyListNodes = (listNodes, depth = 0) => [
    '{',
    listNodes.map((node) => {
      const value = node.children.length === 0
        ? stringifyNodeValue(node.value, depth)
        : stringifyListNodes(node.children, depth + 1);
      return `  ${'    '.repeat(depth)}${mapTypeToSign[node.type]} ${node.key}: ${value}`;
    }).join('\n'),
    `${'    '.repeat(depth)}}`,
  ].join('\n');

  return stringifyListNodes(tree);
};
