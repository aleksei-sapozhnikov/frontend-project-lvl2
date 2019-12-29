import path from 'path';
import fs from 'fs';
import diff from '../src/diff';
import { types as formatterTypes } from '../src/formatters';

const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', 'diff', fileName);

const diffJsonLike = fs.readFileSync(getFixturePath('diffJsonLike'), 'utf8');
const diffPlain = fs.readFileSync(getFixturePath('diffPlain'), 'utf8');
const diffJson = fs.readFileSync(getFixturePath('diffJson'), 'utf8');

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
  ['before.json', 'after.yml'],
  ['before.json', 'after.ini'],
])(' diff (%s, %s)',
  (before, after) => {
    const pathBefore = getFixturePath(before);
    const pathAfter = getFixturePath(after);
    expect(diff(pathBefore, pathAfter, formatterTypes.jsonLike)).toEqual(diffJsonLike);
    expect(diff(pathBefore, pathAfter, formatterTypes.plain)).toEqual(diffPlain);
    expect(diff(pathBefore, pathAfter, formatterTypes.json)).toEqual(diffJson);
  });
