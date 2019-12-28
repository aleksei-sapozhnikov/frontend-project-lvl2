import program from 'commander';
import diff from './diff';

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
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv);

  if (program.format === 'plain') {
    console.log(diff(before, after, 'plain'));
  } else {
    console.log(diff(before, after));
  }
};
