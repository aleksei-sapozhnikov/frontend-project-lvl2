import _ from 'lodash';
import jsYaml from 'js-yaml';
import ini from 'ini';

export const noop = () => {};

const mapObjectNumberStringsToNumbers = (obj) => _.mapValues(obj, (v) => {
  if (_.isObject(v)) {
    return mapObjectNumberStringsToNumbers(v);
  }

  return typeof v !== 'boolean' && !Number.isNaN(Number(v)) ? Number(v) : v;
});

const parsers = [
  {
    fileExt: '.json',
    parse: (strJson) => JSON.parse(strJson),

  },
  {
    fileExt: '.yml',
    parse: (strYaml) => jsYaml.safeLoad(strYaml),
  },
  {
    fileExt: '.ini',
    parse: (strIni) => mapObjectNumberStringsToNumbers(ini.parse(strIni)),
  },
];

export const getParser = (fileExt) => parsers.find((p) => p.fileExt === fileExt);
