import {Command, flags} from '@oclif/command'

export default class Xgettext extends Command {
  static description = 'Extract Vue-i18n strings from *.js and *.vue files to *.pot file'

  static flags = {
    help: flags.help({
      char: 'h'
    }),
    ignore: flags.string({
      description: 'Glob pattern to specify ignored files'
    }),
    output: flags.string({
      char: 'o',
      required: true,
      default: 'messages.pot',
      description: 'Path to output file',
    }),
  }

  static args = [
    {
      name: 'pattern',
      required: true,
      description: `  Glob pattern to specify files to be extracting Vue-i18n strings.
                           Needs to be surrounded with quotes to prevent shell globbing.
                           Guide to globs: https://github.com/isaacs/node-glob#glob-primer`,
      default: '**/*.{js,vue}',
    }
  ]

  async run() {
    const {args, flags} = this.parse(Xgettext)

    const targetFile = flags.output
    const {pattern} = args

    // this.log(args, flags)
    const outputMessage = `Saved X messages from ${pattern} to ${targetFile}`
    this.log(outputMessage)
  }
}
