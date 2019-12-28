import path from 'path';
import { loadSource } from '../src/utils';
import { stringifyTree as toJsonLike } from '../src/formatters/jsonLikeString';
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

// test('aaa', () => {
//   const arr = [
//     "Property 'common.follow' was added with value: false",
//     "Property 'common.setting2' was removed",
//     "Property 'common.setting3' was updated. From true to [complex value]",
//     "Property 'common.setting4' was added with value: 'blah blah'",
//     "Property 'common.setting5' was added with value: [complex value]",
//     "Property 'common.setting6.ops' was added with value: 'vops'",
//     "Property 'group1.baz' was updated. From 'bas' to 'bars'",
//     "Property 'group1.nest' was updated. From [complex value] to 'str'",
//     "Property 'group2' was removed",
//     "Property 'group3' was added with value: [complex value]]",
//   ].join('\n');
//   const obj = { value: arr };

//   fs.writeFileSync(getFixturePath('aaa'), JSON.stringify(obj));
// });
