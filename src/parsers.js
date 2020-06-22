import _ from 'lodash';
import jsYaml from 'js-yaml';
import ini from 'ini';

export const noop = () => {};

const mapObjectNumberStringsToNumbers = (obj) => {
  const mappingFunction = (value) => {
    if (_.isObject(value)) {
      return mapObjectNumberStringsToNumbers(value);
    }

    if (typeof value === 'boolean') {
      return value;
    }

    const valueAsNumber = Number(value);
    if (Number.isNaN(valueAsNumber)) {
      return value;
    }

    return valueAsNumber;
  };

  return _.mapValues(obj, mappingFunction);
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
    parse: (strIni) => {
      const objWithNumberStrings = ini.parse(strIni);
      return mapObjectNumberStringsToNumbers(objWithNumberStrings);
    },
  },
];

export const getParser = (fileExt) => parsers.find((p) => p.fileExt === fileExt);
