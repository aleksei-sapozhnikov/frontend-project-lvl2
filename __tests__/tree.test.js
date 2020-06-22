import { test, expect } from '@jest/globals';
import path from 'path';
import { loadSource } from '../src/utils';
import { buildTree } from '../src/tree';

const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', 'tree', fileName);

const sources = [
  loadSource(getFixturePath('sameKeyWithChangedValue.json')),
  loadSource(getFixturePath('keyChanged.json')),
  loadSource(getFixturePath('equalWithNestedValue.json')),
  loadSource(getFixturePath('nestedValueChanged.json')),
  loadSource(getFixturePath('nestedKeysAddedAndRemoved.json')),
  loadSource(getFixturePath('fullComplexTest.json')),
];

test.each(sources)('%s', (title, source) => {
  const result = buildTree(source.objBefore, source.objAfter);
  expect(result).toEqual(source.expected);
});
