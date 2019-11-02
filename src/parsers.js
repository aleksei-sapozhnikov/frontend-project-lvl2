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
    parse: (strIni) => ini.parse(strIni),
  },
];

export const getByFileExt = (fileExt) => parsers.find((p) => p.fileExt === fileExt);
