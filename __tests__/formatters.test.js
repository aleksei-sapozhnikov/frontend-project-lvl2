import path from 'path';
import { loadSource } from '../src/utils';
import { stringifyTree } from '../src/formatters/jsonLikeString';

const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', 'formatters', fileName);

const testTreeToJsonLikeStringSources = [
  loadSource(getFixturePath('treeToJsonLikeString_simpleValues.json')),
  loadSource(getFixturePath('treeToJsonLikeString_nestedValue.json')),
  loadSource(getFixturePath('treeToJsonLikeString_fullComplexTest.json')),
];

test.each(testTreeToJsonLikeStringSources)('%s', (title, source) => {
  const result = stringifyTree(source.tree);
  expect(result).toEqual(source.expected);
});
