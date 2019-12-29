import program from 'commander';
import diff from './diff';
import { types as formatterTypes } from './formatters';

export default diff;

export const run = () => {
  let before;
  let after;

  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      before = firstConfig;
      after = secondConfig;
    })
    .option('-f, --format [type]', 'Output format', formatterTypes.jsonLike)
    .parse(process.argv);

  console.log(diff(before, after, program.format));
};
