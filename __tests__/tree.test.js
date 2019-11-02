import path from 'path';
import fs from 'fs';
import { buildTree, toJsonString } from '../src/tree';

const pathToTreeFixture = (fileName) => path.join(__dirname, '__fixtures__', 'tree', fileName);

test('same key, changed value', () => {
  const objBefore = { one: 1 };
  const objAfter = { one: 2 };
  const expected = [
    {
      key: 'one', type: 'added', value: 2, children: [],
    },
    {
      key: 'one', type: 'removed', value: 1, children: [],
    },
  ];
  const result = buildTree(objBefore, objAfter);
  expect(result).toEqual(expected);
});

test('changed key', () => {
  const objBefore = { one: 1 };
  const objAfter = { two: 2 };
  const expected = [
    {
      key: 'one', type: 'removed', value: 1, children: [],
    },
    {
      key: 'two', type: 'added', value: 2, children: [],
    },
  ];
  const result = buildTree(objBefore, objAfter);
  expect(result).toEqual(expected);
});

test('equal with children', () => {
  const objBefore = { one: { two: 2 } };
  const objAfter = { one: { two: 2 } };
  const expected = [
    {
      type: 'unchanged',
      key: 'one',
      value: null,
      children: [
        {
          type: 'unchanged', key: 'two', value: 2, children: [],
        },
      ],
    },
  ];
  const result = buildTree(objBefore, objAfter);
  expect(result).toEqual(expected);
});

test('equal parents with changed child', () => {
  const objBefore = { one: { two: 2 } };
  const objAfter = { one: { two: 5 } };
  const expected = [
    {
      type: 'unchanged',
      key: 'one',
      value: null,
      children: [
        {
          key: 'two', type: 'added', value: 5, children: [],
        }, {
          key: 'two', type: 'removed', value: 2, children: [],
        },
      ],
    },
  ];
  const result = buildTree(objBefore, objAfter);
  expect(result).toEqual(expected);
});

test('added and removed keys in group', () => {
  const objBefore = { one: { two: 2 } };
  const objAfter = { one: { three: 3 } };
  const expected = [{
    key: 'one',
    type: 'unchanged',
    value: null,
    children: [
      {
        key: 'three', type: 'added', value: 3, children: [],
      },
      {
        key: 'two', type: 'removed', value: 2, children: [],
      },
    ],
  },
  ];
  const result = buildTree(objBefore, objAfter);
  expect(result).toEqual(expected);
});

test('full complex', () => {
  const objBefore = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: { key: 'value' },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: { key: 'value' },
    },
    group2: { abc: 12345 },
  };
  const objAfter = {
    common: {
      follow: false,
      setting1: 'Value 1',
      setting3: { key: 'value' },
      setting4: 'blah blah',
      setting5: { key5: 'value5' },
      setting6: { key: 'value', ops: 'vops' },
    },
    group1: { foo: 'bar', baz: 'bars', nest: 'str' },
    group3: { fee: 100500 },
  };
  const expected = [
    {
      key: 'common',
      type: 'unchanged',
      value: null,
      children: [
        {
          key: 'follow', type: 'added', value: false, children: [],
        },
        {
          key: 'setting1', type: 'unchanged', value: 'Value 1', children: [],
        },
        {
          key: 'setting2', type: 'removed', value: 200, children: [],
        },
        {
          key: 'setting3', type: 'added', value: { key: 'value' }, children: [],
        },
        {
          key: 'setting3', type: 'removed', value: true, children: [],
        },
        {
          key: 'setting4', type: 'added', value: 'blah blah', children: [],
        },
        {
          key: 'setting5', type: 'added', value: { key5: 'value5' }, children: [],
        },
        {
          key: 'setting6',
          type: 'unchanged',
          value: null,
          children: [
            {
              key: 'key', type: 'unchanged', value: 'value', children: [],
            },
            {
              key: 'ops', type: 'added', value: 'vops', children: [],
            },
          ],
        },
      ],
    },
    {
      key: 'group1',
      type: 'unchanged',
      value: null,
      children: [
        {
          key: 'baz', type: 'added', value: 'bars', children: [],
        },
        {
          key: 'baz', type: 'removed', value: 'bas', children: [],
        },
        {
          key: 'foo', type: 'unchanged', value: 'bar', children: [],
        },
        {
          key: 'nest', type: 'added', value: 'str', children: [],
        },
        {
          key: 'nest', type: 'removed', value: { key: 'value' }, children: [],
        },
      ],
    },
    {
      key: 'group2', type: 'removed', value: { abc: 12345 }, children: [],
    },
    {
      key: 'group3', type: 'added', value: { fee: 100500 }, children: [],
    },
  ];
  const result = buildTree(objBefore, objAfter);
  expect(result).toEqual(expected);
});

//
// toString
//

test('toJsonLikeString: same key, changed value', () => {
  const tree = [
    {
      key: 'one', type: 'added', value: 2, children: [],
    },
    {
      key: 'one', type: 'removed', value: 1, children: [],
    },
  ];
  const expected = [
    '{',
    '  + one: 2',
    '  - one: 1',
    '}',
  ].join('\n');
  const result = toJsonString(tree);
  expect(result).toEqual(expected);
});

test('toJsonLikeString: changed key', () => {
  const tree = [
    {
      key: 'one', type: 'removed', value: 1, children: [],
    },
    {
      key: 'two', type: 'added', value: 2, children: [],
    },
  ];
  const expected = [
    '{',
    '  - one: 1',
    '  + two: 2',
    '}',
  ].join('\n');
  const result = toJsonString(tree);
  expect(result).toEqual(expected);
});

test('toJsonLikeString: equal with children', () => {
  const tree = [
    {
      type: 'unchanged',
      key: 'one',
      value: null,
      children: [
        {
          type: 'unchanged', key: 'two', value: 2, children: [],
        },
      ],
    },
  ];
  const expected = [
    '{',
    '    one: {',
    '        two: 2',
    '    }',
    '}',
  ].join('\n');
  const result = toJsonString(tree);
  expect(result).toEqual(expected);
});

test('toJsonLikeString: full complex', () => {
  const strTree = fs.readFileSync(pathToTreeFixture('complexTree.json'), 'utf8');
  const tree = JSON.parse(strTree);
  const expected = fs.readFileSync(pathToTreeFixture('compexTreeToJsonLikeString'), 'utf8');
  expect(toJsonString(tree)).toEqual(expected);
});
