import program from 'commander';
import diff from './diff';

export default diff;

export const run = () => {
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(diff(firstConfig, secondConfig));
    })
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv);
};
