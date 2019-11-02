import fs from 'fs';
import path from 'path';
import diff from '../src/diff';

const pathToDiffFixture = (fileName) => path.join(__dirname, '__fixtures__', 'diff', fileName);

const diffValue = fs.readFileSync(pathToDiffFixture('diffValue'), 'utf8');

test.each([
  ['before.json', 'after.json'],
  // ['before.yml', 'after.yml'],
  // ['before.ini', 'after.ini'],
  // ['before.json', 'after.yml'],
  // ['before.json', 'after.ini'],
])(' diff complex (%s, %s)',
  (before, after) => {
    const pathBefore = pathToDiffFixture(before);
    const pathAfter = pathToDiffFixture(after);
    expect(diff(pathBefore, pathAfter)).toEqual(diffValue);
  });
