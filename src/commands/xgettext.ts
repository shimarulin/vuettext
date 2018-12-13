import {Command, flags} from '@oclif/command'
import * as debug from 'debug'
import * as fg from 'fast-glob'
import * as path from 'path'

import {SourceStringMetadataList} from '../common/parser-base'
import {writeFile} from '../common/write-file'
import {gettextFormatter} from '../formatters/gettext-formatter'
import {JsParser} from '../parsers/js-parser'

// Run tests with env DEBUG=ctx
// DEBUG=ctx yarn test
const log = debug('cli')

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
      let result: SourceStringMetadataList = {}
      const fileList: string[] = await fg(patternList, {ignore: ignoreList})
      fileList.forEach((filePath: string) => {
        if (path.extname(filePath) === '.vue') {
          // const vueParser = new VueParser(filePath)
          // result = Object.assign({}, result, vueParser.parse(fs.readFileSync(filePath).toString()))
        } else if (path.extname(filePath) === '.js') {
          const jsParser = new JsParser(filePath)
          jsParser.readFile()
          jsParser.parse()
          result = {...result, ...jsParser.result}
        }
      })

      log(result)
      log(args, flags, ignoreList, patternList)

      const content = gettextFormatter(result)
      await writeFile(flags.output, content)

      log(content)

      const outputMessage = `Saved X messages from ${patternList} to file ${flags.output}`

      this.log(outputMessage)
    } catch (e) {
      this.log(e)
    }

  }
}
