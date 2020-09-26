const { Command } = require('commander');
const program = new Command()

const pkgJson = require('./package.json');

program
  .name(pkgJson.name)
  .version(pkgJson.version, '-v, --version', 'output the current version')
  .requiredOption('--project-name <name>', 'project name (used for package.json)')
  .option('--no-tailwind', "don't use Tailwind as styling framework")
  .action((cmd) => {
    const opts = cmd.opts();
    console.log(opts)
  });


program.parse(process.argv);
