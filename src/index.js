#!/usr/bin/env node

import program from 'commander';
import jsonDiff from './diff/jsonDiff';

export default jsonDiff;

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(jsonDiff(firstConfig, secondConfig));
  })
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
