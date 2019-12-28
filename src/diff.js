import fs from 'fs';
import path from 'path';

import { parserByFileExt } from './parsers';
import { buildTree } from './tree';
import { stringifyTree as toJsonLikeString } from './formatters/jsonLikeString';
import { stringifyTree as toPlain } from './formatters/plain';

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

export default (file1, file2, format) => {
  const tree = buildTreeFromFiles(file1, file2);
  switch (format) {
    case 'plain': return toPlain(tree);
    default: return toJsonLikeString(tree);
  }
};
