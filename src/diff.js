import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import parsers from './parsers';

const readObject = (filepath) => {
  const fileExt = path.extname(filepath);
  const parser = parsers.getByFileExt(fileExt);
  const data = fs.readFileSync(filepath, 'utf8');
  return parser.parse(data);
};

const getKeysOfOnlyFirst = (obj1, obj2) => Object.keys(obj1).filter((key1) => !_.has(obj2, key1));

const getMutualKeys = (obj1, obj2) => Object.keys(obj1).reduce(
  (acc, key1) => (_.has(obj2, key1) ? acc.concat(key1) : acc),
  [],
);

const removedPropertyToString = (key, obj) => `  - ${key}: ${obj[key]}`;

const addedPropertyToString = (key, obj) => `  + ${key}: ${obj[key]}`;

const mutualPropertyToString = (key, obj1, obj2) => (obj1[key] === obj2[key]
  ? `    ${key}: ${obj1[key]}`
  : [
    `  + ${key}: ${obj2[key]}`,
    `  - ${key}: ${obj1[key]}`,
  ]);

const arrayToStringDeep = (array, delimiter = '\n') => _.flattenDeep(array).join(delimiter);

export default (file1, file2) => {
  const obj1 = readObject(file1);
  const obj2 = readObject(file2);

  const strRemoved = getKeysOfOnlyFirst(obj1, obj2)
    .map((key) => removedPropertyToString(key, obj1));

  const strAdded = getKeysOfOnlyFirst(obj2, obj1)
    .map((key) => addedPropertyToString(key, obj2));

  const strMutual = getMutualKeys(obj1, obj2)
    .map((key) => mutualPropertyToString(key, obj1, obj2));

  return arrayToStringDeep(['{', strMutual, strRemoved, strAdded, '}']);
};
