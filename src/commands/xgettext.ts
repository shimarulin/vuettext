import {Command, flags} from '@oclif/command'
import * as fg from 'fast-glob'
import * as path from 'path'

import {SourceStringMetadataList} from '../common/parser-base'
import {writeFile} from '../common/write-file'
import {gettextFormatter} from '../formatters/gettext-formatter'
import {JsParser} from '../parsers/js-parser'
import {VueParser} from '../parsers/vue-parser'

const fill = (target: string[], src: string) => {
  src
    .split(/,(?!\w+})/g)
    .map((item: string) => item.trim())
    .forEach((item: string) => { target.push(item) })
}

const ignoreFlagDescription = `Glob pattern to specify ignored files
Expected string or separated comma strings`

const outputFlagDescription = 'Path to output file'

const patternArgDescription = `Glob pattern to specify files to be extracting
Vue-i18n strings. Expected string or separated comma strings
Needs to be surrounded with quotes to prevent shell globbing.
Guide to globs: https://github.com/isaacs/node-glob#glob-primer`

export default class Xgettext extends Command {
  static description = 'Extract Vue-i18n strings from *.js and *.vue files to *.pot file'

  static flags = {
    help: flags.help({
      char: 'h'
    }),
    ignore: flags.string({
      description: ignoreFlagDescription
    }),
    output: flags.string({
      char: 'o',
      required: true,
      default: 'messages.pot',
      description: outputFlagDescription,
    }),
  }

  static args = [
    {
      name: 'pattern',
      required: true,
      description: patternArgDescription,
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
          const vueParser = new VueParser(filePath)
          vueParser.readFile()
          vueParser.parse()
          result = {...result, ...vueParser.result}
        } else if (path.extname(filePath) === '.js') {
          const jsParser = new JsParser(filePath)
          jsParser.readFile()
          jsParser.parse()
          result = {...result, ...jsParser.result}
        }
      })

      const content = gettextFormatter(result)
      await writeFile(flags.output, content)

      const outputMessage = `Saved X messages from ${patternList} to file ${flags.output}`

      this.log(outputMessage)
    } catch (e) {
      this.log(e)
    }

  }
}
