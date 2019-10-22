import jsYaml from 'js-yaml';
import ini from 'ini';

const parsersList = [
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

export default {
  getByFileExt: (fileExt) => parsersList.find((p) => p.fileExt === fileExt),
};
