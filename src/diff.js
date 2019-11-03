import fs from 'fs';
import path from 'path';

import { parserByFileExt } from './parsers';
import { buildTree } from './tree';
import { formatterByType } from './formatters';

const readObject = (filepath) => {
  const fileExt = path.extname(filepath);
  const parser = parserByFileExt(fileExt);
  const data = fs.readFileSync(filepath, 'utf8');
  return parser.parse(data);
};

const buildTreeFromFiles = (file1, file2) => {
  const obj1 = readObject(file1);
  const obj2 = readObject(file2);
  return buildTree(obj1, obj2);
};

export default (file1, file2) => {
  const tree = buildTreeFromFiles(file1, file2);
  const formatter = formatterByType('jsonLikeString');
  return formatter.format(tree);
};
