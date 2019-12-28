import _ from 'lodash';

export const noop = () => {};

const getNodeFullName = (node, listParents) => listParents.map((n) => n.key).concat(node.key).join('.');

const getNodeValue = (node) => {
  const { value } = node;

  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const listNodeFormatters = [
  {
    check: (listNodes) => listNodes.length === 1 && listNodes[0].type === 'added',
    format: (listNodes, listParents) => {
      const node = listNodes[0];
      const name = getNodeFullName(node, listParents);
      const value = getNodeValue(node);
      return `Property '${name}' was added with value: ${value}`;
    },
  },
  {
    check: (listNodes) => listNodes.length === 1 && listNodes[0].type === 'removed',
    format: (listNodes, listParents) => {
      const node = listNodes[0];
      const name = getNodeFullName(node, listParents);
      return `Property '${name}' was removed`;
    },
  },
  {
    check: (listNodes) => listNodes.length === 2 && ['added', 'removed'].every((val) => _.map(listNodes, (node) => node.type).includes(val)),
    format: (listNodes, listParents) => {
      const nodeAdded = listNodes.find((node) => node.type === 'added');
      const valueAdded = getNodeValue(nodeAdded);

      const nodeRemoved = listNodes.find((node) => node.type === 'removed');
      const valueRemoved = getNodeValue(nodeRemoved);

      const name = getNodeFullName(nodeAdded, listParents);
      return `Property '${name}' was updated. From ${valueRemoved} to ${valueAdded}`;
    },
  },
];

const getNodeFormatters = (listNodes) => listNodeFormatters
  .filter((formatter) => formatter.check(listNodes));

const stringifyListNodes = (listNodes, listParents = []) => {
  const keys = _.chain(listNodes).map((node) => node.key).uniq().value();

  return keys.reduce((acc, key) => {
    const nodes = listNodes.filter(((node) => node.key === key));

    const formatters = getNodeFormatters(nodes);
    const strNodes = formatters.length > 0
      ? acc.concat(...formatters.map((formatter) => formatter.format(nodes, listParents)))
      : acc;

    const newListParents = listParents.concat(nodes[0]);
    const strChildren = nodes.length === 1
      ? stringifyListNodes(nodes[0].children, newListParents)
      : [];

    return strNodes.concat(strChildren);
  }, []);
};

export const stringifyTree = (tree) => stringifyListNodes(tree).join('\n');
