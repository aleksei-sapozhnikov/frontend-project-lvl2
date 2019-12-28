import path from 'path';
import { loadSource } from '../src/utils';
import { stringifyTree as toJsonLike } from '../src/formatters/json';
import { stringifyTree as toPlain } from '../src/formatters/plain';

const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', 'formatters', fileName);

const sources = [
  loadSource(getFixturePath('simpleValues.json')),
  loadSource(getFixturePath('nestedValue.json')),
  loadSource(getFixturePath('fullComplexTest.json')),
];

test.each(sources)('%s', (title, source) => {
  expect(toJsonLike(source.tree)).toEqual(source.toJsonLikeString);
  expect(toPlain(source.tree)).toEqual(source.toPlainText);
});
