import fs from 'fs';
import path from 'path';
import jsonDiff from '../../src/diff/jsonDiff';

const buildFixturePath = (partialPath) => path.join(__dirname, '../__fixtures__', partialPath);

const pathBefore = buildFixturePath('1_before.json');
const pathAfter = buildFixturePath('1_after.json');
const pathDiff = buildFixturePath('1_diff');

const diffBeforeAfter = fs.readFileSync(pathDiff, 'utf8');

test('basic work', () => {
  expect(jsonDiff(pathBefore, pathAfter)).toEqual(diffBeforeAfter);
});
