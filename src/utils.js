import fs from 'fs';
import path from 'path';

export const noop = () => {};

export const loadSource = (filePath, fileExt = '.json') => {
  const title = path.basename(filePath, fileExt);
  const source = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return [title, source];
};
