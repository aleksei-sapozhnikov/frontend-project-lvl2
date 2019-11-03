import path from 'path';
import fs from 'fs';
import diff from '../src/diff';

const pathToDiffFixture = (fileName) => path.join(__dirname, '__fixtures__', 'diff', fileName);

const diffValue = fs.readFileSync(pathToDiffFixture('diffValue'), 'utf8');

test.each([
  ['json_before.json', 'json_after.json'],
  ['yaml_before.yml', 'yaml_after.yml'],
  ['ini_before.ini', 'ini_after.ini'],
  ['json_before.json', 'yaml_after.yml'],
  ['json_before.json', 'ini_after.ini'],
])(' diff complex (%s, %s)',
  (before, after) => {
    const pathBefore = pathToDiffFixture(before);
    const pathAfter = pathToDiffFixture(after);
    expect(diff(pathBefore, pathAfter)).toEqual(diffValue);
  });
