import _ from 'lodash';
import jsYaml from 'js-yaml';
import ini from 'ini';

export const noop = () => {};

const mapObjectNumberStringsToNumbers = (obj) => {
  const iter = (value) => {
    if (_.isObject(value)) {
      return mapObjectNumberStringsToNumbers(value);
    }

    return !Number.isNaN(Number(value)) && typeof value !== 'boolean' ? Number(value) : value;
  };

  return _.mapValues(obj, iter);
};

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
