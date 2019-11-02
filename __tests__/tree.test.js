import path from 'path';
import fs from 'fs';
import { buildTree, toJsonString } from '../src/tree';

const pathToTreeFixture = (fileName) => path.join(__dirname, '__fixtures__', 'tree', fileName);

const createSource = (name) => [
  name,
  JSON.parse(fs.readFileSync(pathToTreeFixture(`${name}.json`), 'utf8')),
];

const objectsToTreeSources = [
  createSource('objectsToTree_sameKeyWithChangedValue'),
  createSource('objectsToTree_keyChanged'),
  createSource('objectsToTree_equalWithNestedValue'),
  createSource('objectsToTree_nestedValueChanged'),
  createSource('objectsToTree_nestedKeysAddedAndRemoved'),
  createSource('objectsToTree_fullComplexTest'),
];
test.each(objectsToTreeSources)('%s', (title, source) => {
  const result = buildTree(source.objBefore, source.objAfter);
  expect(result).toEqual(source.expected);
});

const testTreeToJsonLikeStringSources = [
  createSource('treeToJsonLikeString_simpleValues'),
  createSource('treeToJsonLikeString_nestedValue'),
  createSource('treeToJsonLikeString_fullComplexTest'),
];
test.each(testTreeToJsonLikeStringSources)('%s', (title, source) => {
  const result = toJsonString(source.tree);
  expect(result).toEqual(source.expected);
});
