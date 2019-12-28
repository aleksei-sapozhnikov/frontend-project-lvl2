import { stringifyTree as toJsonLike } from './json';
import { stringifyTree as toPlainText } from './plain';

export const noop = () => {};

const formatters = [
  {
    check: (type) => type === 'json',
    formatter: toJsonLike,
  },
  {
    check: (type) => type === 'plain',
    formatter: toPlainText,
  },
];

export const getFormatter = (type) => formatters.find((f) => f.check(type)).formatter;
