import path from 'path';
import fs from 'fs';
import { formatterByType } from '../src/formatters';

const pathToFormattersFixture = (fileName) => path.join(__dirname, '__fixtures__', 'formatters', fileName);

const createSource = (name) => [
  name,
  JSON.parse(fs.readFileSync(pathToFormattersFixture(`${name}.json`), 'utf8')),
];

const testTreeToJsonLikeStringSources = [
  createSource('treeToJsonLikeString_simpleValues'),
  createSource('treeToJsonLikeString_nestedValue'),
  createSource('treeToJsonLikeString_fullComplexTest'),
];
test.each(testTreeToJsonLikeStringSources)('%s', (title, source) => {
  const formatter = formatterByType('jsonLikeString');
  const result = formatter.format(source.tree);
  expect(result).toEqual(source.expected);
});
