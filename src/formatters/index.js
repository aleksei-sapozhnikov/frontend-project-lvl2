import { stringifyTree as toJsonLike } from './jsonLike.js';
import { stringifyTree as toPlain } from './plain.js';
import { stringifyTree as toJson } from './json.js';

export const noop = () => {};

export const types = {
  jsonLike: 'jsonLike',
  plain: 'plain',
  json: 'json',
};

const formatters = [
  {
    check: (type) => type === types.jsonLike,
    format: toJsonLike,
  },
  {
    check: (type) => type === types.plain,
    format: toPlain,
  },
  {
    check: (type) => type === types.json,
    format: toJson,
  },
];

export const getFormatter = (type) => formatters.find((f) => f.check(type));
