import path from 'path';
import fs from 'fs';
import { buildTree, toJsonString } from '../src/tree';

const pathToTreeFixture = (fileName) => path.join(__dirname, '__fixtures__', 'tree', fileName);

const testObjectsToTreeSources = [
  [
    'objects to tree: same key, changed value',
    {
      objBefore: { one: 1 },
      objAfter: { one: 2 },
      expected: [
        {
          key: 'one', type: 'added', value: 2, children: [],
        },
        {
          key: 'one', type: 'removed', value: 1, children: [],
        },
      ],
    },
  ],
  [
    'objects to tree: changed key',
    {
      objBefore: { one: 1 },
      objAfter: { two: 2 },
      expected: [
        {
          key: 'one', type: 'removed', value: 1, children: [],
        },
        {
          key: 'two', type: 'added', value: 2, children: [],
        },
      ],
    },
  ],
  [
    'objects to tree: equal with children',
    {
      objBefore: { one: { two: 2 } },
      objAfter: { one: { two: 2 } },
      expected: [
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
      ],
    },
  ],
  [
    'objects to tree: equal parents with changed child',
    {
      objBefore: { one: { two: 2 } },
      objAfter: { one: { two: 5 } },
      expected: [
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
      ],
    },
  ],
  [
    'objects to tree: added and removed keys in group',
    {
      objBefore: { one: { two: 2 } },
      objAfter: { one: { three: 3 } },
      expected: [
        {
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
      ],
    },
  ],
  [
    'objects to tree: full complex test',
    {
      objBefore: JSON.parse(fs.readFileSync(pathToTreeFixture('objBefore.json', 'utf8'))),
      objAfter: JSON.parse(fs.readFileSync(pathToTreeFixture('objAfter.json', 'utf8'))),
      expected: JSON.parse(fs.readFileSync(pathToTreeFixture('complexTree.json'))),
    },
  ],
];

test.each(testObjectsToTreeSources)('%s', (title, source) => {
  const result = buildTree(source.objBefore, source.objAfter);
  expect(result).toEqual(source.expected);
});

const testTreeToJsonLikeStringSources = [
  [
    'tree to json-like string: simple values',
    {
      tree: [
        {
          key: 'one', type: 'added', value: 1, children: [],
        },
        {
          key: 'two', type: 'removed', value: 2, children: [],
        },
        {
          key: 'three', type: 'unchanged', value: 3, children: [],
        },
      ],
      expected: [
        '{',
        '  + one: 1',
        '  - two: 2',
        '    three: 3',
        '}',
      ].join('\n'),
    },
  ],
  [
    'tree to json-like string: nested value',
    {
      tree: [
        {
          type: 'unchanged',
          key: 'one',
          value: null,
          children: [
            {
              type: 'added', key: 'two', value: 2, children: [],
            },
          ],
        },
      ],
      expected: [
        '{',
        '    one: {',
        '      + two: 2',
        '    }',
        '}',
      ].join('\n'),
    },
  ],
  [
    'tree to json-like string: full complex test',
    {
      tree: JSON.parse(fs.readFileSync(pathToTreeFixture('complexTree.json'), 'utf8')),
      expected: fs.readFileSync(pathToTreeFixture('compexTreeToJsonLikeString'), 'utf8'),
    },
  ],
];

test.each(testTreeToJsonLikeStringSources)('%s', (title, source) => {
  const result = toJsonString(source.tree);
  expect(result).toEqual(source.expected);
});
