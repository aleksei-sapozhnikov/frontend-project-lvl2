import fs from 'fs';
import path from 'path';
import diff from '../src/diff';

const buildFixturePath = (partialPath) => path.join(__dirname, '__fixtures__', partialPath);

const pathDiff = buildFixturePath('diffValue');
const diffValue = fs.readFileSync(pathDiff, 'utf8');

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
  ['before.json', 'after.yml'],
  ['before.json', 'after.ini'],
])(' diff (%s, %s)',
  (before, after) => {
    const pathBefore = buildFixturePath(before);
    const pathAfter = buildFixturePath(after);
    expect(diff(pathBefore, pathAfter)).toEqual(diffValue);
  });
