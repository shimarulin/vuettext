import {Command, flags} from '@oclif/command'
import * as fg from 'fast-glob'
import * as path from 'path'

const fill = (target: string[], src: string) => {
  src
    .split(/,(?!\w+})/g)
    .map((item: string) => item.trim())
    .forEach((item: string) => { target.push(item) })
}

export default class Xgettext extends Command {
  static description = 'Extract Vue-i18n strings from *.js and *.vue files to *.pot file'

  static flags = {
    help: flags.help({
      char: 'h'
    }),
    ignore: flags.string({
      description: `Glob pattern to specify ignored files
                    Expected string or separated comma strings`
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
                           Expected string or separated comma strings
                           Needs to be surrounded with quotes to prevent shell globbing.
                           Guide to globs: https://github.com/isaacs/node-glob#glob-primer`,
      default: '**/*.{js,vue}',
    }
  ]

  async run() {
    const {args, flags} = this.parse(Xgettext)

    const ignoreList: string[] = ['node_modules']
    const patternList: string[] = []

    fill(patternList, args.pattern)

    if (flags.ignore) {
      fill(ignoreList, flags.ignore)
    }

    try {
      const fileList: string[] = await fg(patternList, {ignore: ignoreList})
      fileList.forEach((filePath: string) => {
        if (path.extname(filePath) === '.vue') {
          // const vueParser = new VueParser(filePath)
          // result = Object.assign({}, result, vueParser.parse(fs.readFileSync(filePath).toString()))
        } else if (path.extname(filePath) === '.js') {
          // const jsParser = new JsParser(filePath)
          // result = Object.assign({}, result, jsParser.parse(fs.readFileSync(filePath).toString()))
        }
      })
    } catch (e) {
      this.log('err', e)
    }

    // this.log(args, flags, ignoreList, patternList)
    const outputMessage = `Saved X messages from ${patternList} to ${flags.output}`
    this.log(outputMessage)
  }
}
