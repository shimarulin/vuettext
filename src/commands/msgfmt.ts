import {Command, flags} from '@oclif/command'
import * as fg from 'fast-glob'
import * as path from 'path'
import * as Po from 'pofile'

import {IGNORE_LIST_DEFAULT} from '../common/constants'
import {fillList} from '../common/fill-list'
import {getDefaultValue, getDescription} from '../common/flag-attrs'
import {writeFile} from '../common/write-file'
import {vueI18nFormatter} from '../formatters/vue-i18n-formatter'

export default class Msgfmt extends Command {
  static description = 'Convert *.po messages to vue-i18n format'

  static flags = {
    help: flags.help({
      char: 'h'
    }),
    ignore: flags.string({
      description: getDescription('IGNORE')
    }),
    input: flags.string({
      char: 'i',
      required: true,
      default: getDefaultValue('MESSAGES'),
      description: getDescription('GLOB', '*.po'),
    }),
    output: flags.string({
      char: 'o',
      required: true,
      default: getDefaultValue('LOCALES_DIR'),
      description: getDescription('PATH', 'updated reference file (*.pot template)'),
    }),
  }

  async run() {
    const {flags} = this.parse(Msgfmt)

    const ignoreList: string[] = IGNORE_LIST_DEFAULT
    const patternList: string[] = []

    fillList(patternList, flags.input)

    if (flags.ignore) {
      fillList(ignoreList, flags.ignore)
    }

    try {
      const fileList: string[] = await fg(patternList, {ignore: ignoreList})
      const outputMessageList: Promise<string>[] = []

      fileList.forEach((filePath: string) => {
        const fileName = path.basename(filePath, '.po')
        const outputMessageItem: Promise<string> = new Promise(resolve => {
          Po.load(filePath, async (err, po) => {
            if (err) throw err

            const localeFileContent = vueI18nFormatter(po.items)
            const localeFilePath = path.join(flags.output, `${fileName}.json`)

            await writeFile(localeFilePath, localeFileContent)

            resolve(`Saved ${po.items.length.toString(10)} items to ${localeFilePath}`)
          })
        })

        outputMessageList.push(outputMessageItem)
      })

      const outputMessage = await Promise.all(outputMessageList)
        .then((results: string[]) => {
          return results.join('\n')
        })

      this.log(outputMessage)
    } catch (e) {
      this.log(e)
    }
  }
}
