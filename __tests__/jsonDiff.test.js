import fs from 'fs';
import path from 'path';
import jsonDiff from '../src/diff';

const buildFixturePath = (partialPath) => path.join(__dirname, '__fixtures__', partialPath);

test('basic work json', () => {
  const pathBefore = buildFixturePath('1_before.json');
  const pathAfter = buildFixturePath('1_after.json');
  const pathDiff = buildFixturePath('1_diff');
  const diff = fs.readFileSync(pathDiff, 'utf8');
  expect(jsonDiff(pathBefore, pathAfter)).toEqual(diff);
});

test('basic work yaml', () => {
  const pathBefore = buildFixturePath('1_before.yml');
  const pathAfter = buildFixturePath('1_after.yml');
  const pathDiff = buildFixturePath('1_diff');
  const diff = fs.readFileSync(pathDiff, 'utf8');
  expect(jsonDiff(pathBefore, pathAfter)).toEqual(diff);
});

test('json and yaml', () => {
  const pathBefore = buildFixturePath('1_before.json');
  const pathAfter = buildFixturePath('1_after.yml');
  const pathDiff = buildFixturePath('1_diff');
  const diff = fs.readFileSync(pathDiff, 'utf8');
  expect(jsonDiff(pathBefore, pathAfter)).toEqual(diff);
});
