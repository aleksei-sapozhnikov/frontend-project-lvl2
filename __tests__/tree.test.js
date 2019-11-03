import path from 'path';
import fs from 'fs';
import { buildTree } from '../src/tree';

const pathToTreeFixture = (fileName) => path.join(__dirname, '__fixtures__', 'tree', fileName);

const loadSource = (fileName) => {
  const filePath = pathToTreeFixture(fileName);
  const title = path.basename(filePath, '.json');
  const source = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return [title, source];
};

const objectsToTreeSources = [
  loadSource('objectsToTree_sameKeyWithChangedValue.json'),
  loadSource('objectsToTree_keyChanged.json'),
  loadSource('objectsToTree_equalWithNestedValue.json'),
  loadSource('objectsToTree_nestedValueChanged.json'),
  loadSource('objectsToTree_nestedKeysAddedAndRemoved.json'),
  loadSource('objectsToTree_fullComplexTest.json'),
];

test.each(objectsToTreeSources)('%s', (title, source) => {
  const result = buildTree(source.objBefore, source.objAfter);
  expect(result).toEqual(source.expected);
});
