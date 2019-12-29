import _ from 'lodash';
import jsYaml from 'js-yaml';
import ini from 'ini';

export const noop = () => {};

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
      const mapNumbers = (obj) => _.mapValues(obj, (v) => {
        if (_.isObject(v)) {
          return mapNumbers(v);
        }

        return typeof v !== 'boolean' && !Number.isNaN(Number(v)) ? Number(v) : v;
      });

      const parsedObj = ini.parse(strIni);
      return mapNumbers(parsedObj);
    },
  },
];

export const getParser = (fileExt) => parsers.find((p) => p.fileExt === fileExt);
