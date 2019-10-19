import fs from 'fs';
import path from 'path';
import jsonDiff from '../src/diff';

const buildFixturePath = (partialPath) => path.join(__dirname, '__fixtures__', partialPath);

const pathBeforeJson = buildFixturePath('1_before.json');
const pathAfterJson = buildFixturePath('1_after.json');
const pathBeforeYaml = buildFixturePath('1_before.yml');
const pathAfterYaml = buildFixturePath('1_after.yml');
const pathDiff = buildFixturePath('1_diff');
const diff = fs.readFileSync(pathDiff, 'utf8');

test('basic work json', () => {
  expect(jsonDiff(pathBeforeJson, pathAfterJson)).toEqual(diff);
});

test('basic work yaml', () => {
  expect(jsonDiff(pathBeforeYaml, pathAfterYaml)).toEqual(diff);
});

test('json and yaml', () => {
  expect(jsonDiff(pathBeforeJson, pathAfterYaml)).toEqual(diff);
});
