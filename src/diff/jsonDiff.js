import _ from 'lodash';
import fs from 'fs';

const readObject = (path) => {
  const strJson = fs.readFileSync(path, 'utf8');
  return JSON.parse(strJson);
};

const getKeysOfOnlyFirst = (obj1, obj2) => Object.keys(obj1).filter((key1) => !_.has(obj2, key1));

const getMutualKeys = (obj1, obj2) => Object.keys(obj1).reduce(
  (acc, key1) => (_.has(obj2, key1) ? acc.concat(key1) : acc),
  [],
);

const removedToString = (key, obj) => `  - ${key}: ${obj[key]}`;

const addedToString = (key, obj) => `  + ${key}: ${obj[key]}`;

const mutualToString = (key, obj1, obj2) => (obj1[key] === obj2[key]
  ? `    ${key}: ${obj1[key]}`
  : [
    `  + ${key}: ${obj2[key]}`,
    `  - ${key}: ${obj1[key]}`,
  ]);

const arrayToStringDeep = (array, delimiter = '\n') => _.flattenDeep(array).join(delimiter);

export default (file1, file2) => {
  const obj1 = readObject(file1);
  const obj2 = readObject(file2);
  const strRemoved = getKeysOfOnlyFirst(obj1, obj2).map((key) => removedToString(key, obj1));
  const strAdded = getKeysOfOnlyFirst(obj2, obj1).map((key) => addedToString(key, obj2));
  const strMutual = getMutualKeys(obj1, obj2).map((key) => mutualToString(key, obj1, obj2));
  return arrayToStringDeep(['{', strMutual, strRemoved, strAdded, '}']);
};
