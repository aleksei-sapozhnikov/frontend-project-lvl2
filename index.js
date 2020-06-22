import program from 'commander';
import diff from './src/diff.js';
import { types as formatterTypes } from './src/formatters/index.js';

export default diff;

export const run = () => {
  const action = (before, after) => console.log(diff(before, after, program.format));

  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .action((configBefore, configAfter) => action(configBefore, configAfter))
    .option('-f, --format [type]', 'Output format', formatterTypes.jsonLike)
    .parse(process.argv);
};
