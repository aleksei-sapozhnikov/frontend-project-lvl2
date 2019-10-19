import jsYaml from 'js-yaml';

const jsonParser = {
  fileExt: '.json',
  parse: (strJson) => JSON.parse(strJson),
};

const yamlParser = {
  fileExt: '.yml',
  parse: (strYaml) => jsYaml.safeLoad(strYaml),
};

const parsersList = [jsonParser, yamlParser];

export default {
  getByFileExt: (fileExt) => parsersList.find((p) => p.fileExt === fileExt),
};
