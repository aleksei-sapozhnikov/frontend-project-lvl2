import _ from 'lodash';

export const noop = () => {};

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

const isValueChangedInSameKey = (key, objBefore, objAfter) => (
  _.has(objBefore, key)
  && _.has(objAfter, key)
  && !_.isEqual(objBefore[key], objAfter[key])
);

const isAdded = (key, objBefore, objAfter) => {
  if (!_.has(objBefore, key) && _.has(objAfter, key)) {
    return true;
  }
  if (_.isObject(objBefore[key]) && _.isObject(objAfter[key])) {
    return false;
  }
  if (isValueChangedInSameKey(key, objBefore, objAfter)) {
    return true;
  }
  return false;
};

const makeNodeAdded = (key, objAfter) => ({
  key,
  type: 'added',
  value: objAfter[key],
  children: [],
});

const isRemoved = (key, objBefore, objAfter) => {
  if (_.has(objBefore, key) && !_.has(objAfter, key)) {
    return true;
  }
  if (_.isObject(objBefore[key]) && _.isObject(objAfter[key])) {
    return false;
  }
  if (isValueChangedInSameKey(key, objBefore, objAfter)) {
    return true;
  }
  return false;
};

const makeNodeRemoved = (key, objBefore) => ({
  key,
  type: 'removed',
  value: objBefore[key],
  children: [],
});

const isUnchanged = (key, objBefore, objAfter) => {
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
};

const makeNodeUnchanged = (key, objBefore, objAfter, fnMakeNodeMappers) => ({
  key,
  type: 'unchanged',
  value: _.isObject(objBefore[key]) ? null : objBefore[key],
  children: _.isObject(objBefore[key]) && _.isObject(objAfter[key])
    ? makeNodes(objBefore[key], objAfter[key], fnMakeNodeMappers(objBefore[key], objAfter[key]))
    : [],
});

const makeNodeMappers = (objBefore, objAfter) => [
  {
    makeNode: (key) => makeNodeAdded(key, objAfter),
    check: (key) => isAdded(key, objBefore, objAfter),
  },
  {
    makeNode: (key) => makeNodeRemoved(key, objBefore),
    check: (key) => isRemoved(key, objBefore, objAfter),
  },
  {
    makeNode: (key) => makeNodeUnchanged(key, objBefore, objAfter, makeNodeMappers),
    check: (key) => isUnchanged(key, objBefore, objAfter),
  },
];

export const buildTree = (objBefore, objAfter) => makeNodes(
  objBefore,
  objAfter,
  makeNodeMappers(objBefore, objAfter),
);
