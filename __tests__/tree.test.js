import path from 'path';
import { loadSource } from '../src/utils';
import { buildTree } from '../src/tree';

const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', 'tree', fileName);

const objectsToTreeSources = [
  loadSource(getFixturePath('objectsToTree_sameKeyWithChangedValue.json')),
  loadSource(getFixturePath('objectsToTree_keyChanged.json')),
  loadSource(getFixturePath('objectsToTree_equalWithNestedValue.json')),
  loadSource(getFixturePath('objectsToTree_nestedValueChanged.json')),
  loadSource(getFixturePath('objectsToTree_nestedKeysAddedAndRemoved.json')),
  loadSource(getFixturePath('objectsToTree_fullComplexTest.json')),
];

test.each(objectsToTreeSources)('%s', (title, source) => {
  const result = buildTree(source.objBefore, source.objAfter);
  expect(result).toEqual(source.expected);
});
