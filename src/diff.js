import fs from 'fs';
import path from 'path';

import { buildTree } from './tree.js';
import { getParser } from './parsers.js';
import { getFormatter } from './formatters/index.js';

const readObject = (filepath) => {
  const fileExt = path.extname(filepath);
  const parser = getParser(fileExt);
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
  return getFormatter(format).format(tree);
};
