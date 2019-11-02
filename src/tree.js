import _ from 'lodash';

const nodeComparator = (a, b) => {
  const first = a.key.toString().localeCompare(b.key.toString());
  return first !== 0 ? first : a.type.toString().localeCompare(b.type.toString());
};

const makeNodes = (objBefore, objAfter, nodeMappers) => {
  const keys = _.union(Object.keys(objBefore), Object.keys(objAfter));
  const listNodes = keys.reduce((acc, key) => {
    const nodes = nodeMappers
      .filter((mapper) => mapper.check(key))
      .map((mapper) => mapper.makeNode(key));
    return acc.concat(nodes);
  }, []);
  return listNodes.sort(nodeComparator);
};

const makeNodeMappers = (objBefore, objAfter) => [
  {
    makeNode: (key) => ({
      key,
      type: 'added',
      value: objAfter[key],
      children: [],
    }),
    check: (key) => {
      if (!_.has(objBefore, key) && _.has(objAfter, key)) {
        return true;
      }
      if (_.isObject(objBefore[key]) && _.isObject(objAfter[key])) {
        return false;
      }
      if (_.has(objBefore, key) && _.has(objAfter, key)
        && !_.isEqual(objBefore[key], objAfter[key])) {
        return true;
      }
      return false;
    },
  },
  {
    makeNode: (key) => ({
      key,
      type: 'removed',
      value: objBefore[key],
      children: [],
    }),
    check: (key) => {
      if (_.has(objBefore, key) && !_.has(objAfter, key)) {
        return true;
      }
      if (_.isObject(objBefore[key]) && _.isObject(objAfter[key])) {
        return false;
      }
      if (_.has(objBefore, key) && _.has(objAfter, key)
      && !_.isEqual(objBefore[key], objAfter[key])) {
        return true;
      }
      return false;
    },
  },
  {
    makeNode: (key) => ({
      key,
      type: 'unchanged',
      value: _.isObject(objBefore[key]) ? null : objBefore[key],
      children: _.isObject(objBefore[key]) && _.isObject(objAfter[key])
        ? makeNodes(objBefore[key], objAfter[key], makeNodeMappers(objBefore[key], objAfter[key]))
        : [],
    }),
    check: (key) => {
      if (!(_.has(objBefore, key) && _.has(objAfter, key))) {
        return false;
      }
      if (_.isObject(objBefore[key]) && _.isObject(objAfter[key])) {
        return true;
      }
      if (_.isEqual(objBefore[key], objAfter[key])) {
        return true;
      }
      return false;
    },
  },
];

export const buildTree = (objBefore, objAfter) => makeNodes(
  objBefore,
  objAfter,
  makeNodeMappers(objBefore, objAfter),
);

export const toJsonString = (tree) => {
  const mapSign = {
    added: '+',
    removed: '-',
    unchanged: ' ',
  };

  const valueToString = (value, depth) => {
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

  const nodeListToString = (node, depth = 0) => [
    '{',
    node.map((n) => {
      const value = n.children.length === 0
        ? valueToString(n.value, depth)
        : nodeListToString(n.children, depth + 1);
      return `  ${'    '.repeat(depth)}${mapSign[n.type]} ${n.key}: ${value}`;
    }).join('\n'),
    `${'    '.repeat(depth)}}`,
  ].join('\n');

  return nodeListToString(tree);
};
