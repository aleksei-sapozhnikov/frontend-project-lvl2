import fs from 'fs';
import path from 'path';
import diff from '../src/diff';

const pathToPlainFixture = (fileName) => path.join(__dirname, '__fixtures__', 'plain', fileName);
const pathPlainDiff = pathToPlainFixture('diffValue');
const plainDiffValue = fs.readFileSync(pathPlainDiff, 'utf8');
test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
  ['before.json', 'after.yml'],
  ['before.json', 'after.ini'],
])(' diff plain (%s, %s)',
  (before, after) => {
    const pathBefore = pathToPlainFixture(before);
    const pathAfter = pathToPlainFixture(after);
    expect(diff(pathBefore, pathAfter)).toEqual(plainDiffValue);
  });

const pathToComplexFixture = (fileName) => path.join(__dirname, '__fixtures__', 'complex', fileName);
const pathComplexDiff = pathToComplexFixture('diffValue');
const complexDiffValue = fs.readFileSync(pathComplexDiff, 'utf8');
test.each([
  ['before.json', 'after.json'],
  // ['before.yml', 'after.yml'],
  // ['before.ini', 'after.ini'],
  // ['before.json', 'after.yml'],
  // ['before.json', 'after.ini'],
])(' diff complex (%s, %s)',
  (before, after) => {
    const pathBefore = pathToComplexFixture(before);
    const pathAfter = pathToComplexFixture(after);
    expect(diff(pathBefore, pathAfter)).toEqual(complexDiffValue);
  });
