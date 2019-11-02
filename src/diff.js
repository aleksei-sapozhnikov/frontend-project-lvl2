import fs from 'fs';
import path from 'path';

import { getByFileExt } from './parsers';
import { buildTree, toJsonString } from './tree';

const readObject = (filepath) => {
  const fileExt = path.extname(filepath);
  const parser = getByFileExt(fileExt);
  const data = fs.readFileSync(filepath, 'utf8');
  return parser.parse(data);
};

const getTree = (file1, file2) => {
  const obj1 = readObject(file1);
  const obj2 = readObject(file2);
  return buildTree(obj1, obj2);
};

export default (file1, file2) => {
  const tree = getTree(file1, file2);
  return toJsonString(tree);
};
