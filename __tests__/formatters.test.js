import path from 'path';
import fs from 'fs';
import { stringifyTree } from '../src/formatters/jsonLikeString';

const pathToFormattersFixture = (fileName) => path.join(__dirname, '__fixtures__', 'formatters', fileName);

const loadSource = (fileName) => {
  const filePath = pathToFormattersFixture(fileName);
  const title = path.basename(filePath, '.json');
  const source = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return [title, source];
};

const testTreeToJsonLikeStringSources = [
  loadSource('treeToJsonLikeString_simpleValues.json'),
  loadSource('treeToJsonLikeString_nestedValue.json'),
  loadSource('treeToJsonLikeString_fullComplexTest.json'),
];
test.each(testTreeToJsonLikeStringSources)('%s', (title, source) => {
  const result = stringifyTree(source.tree);
  expect(result).toEqual(source.expected);
});
