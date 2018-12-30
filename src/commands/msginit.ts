import {Command, flags} from '@oclif/command'
import * as child_process from 'child_process'
import * as fuzzy from 'fuzzy'
import * as inquirer from 'inquirer'
import * as autocomplete from 'inquirer-autocomplete-prompt'
import * as iso6393 from 'iso-639-3'
import * as path from 'path'

import {mkpath} from '../common/mkpath'

inquirer.registerPrompt('autocomplete', autocomplete)

// tslint:disable-next-line
const searchLanguageCode = (answers: object, input = '') => {
  /**
   * ISO 639 implementation:
   * https://github.com/wooorm/iso-639-3
   *
   * More about language codes:
   * - https://www.gnu.org/software/gettext/manual/html_node/Language-Codes.html#Language-Codes
   * - https://www.gnu.org/software/gettext/manual/html_node/Header-Entry.html
   */
  const languages = iso6393
    .filter(el => el.type === 'living')
    .filter(lang => lang.scope !== 'special')
    .filter(lang => lang.iso6391 !== null)
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0
    })

  return new Promise(function (resolve) {
    let fuzzyResult = fuzzy.filter(input, languages, {
      extract(lang) {
        return input.length <= 3 && (lang.iso6391 === input || lang.iso6393 === input)
          ? lang.iso6391 || lang.iso6393 || ''
          : lang.name
      }
    })
    resolve(
      fuzzyResult.map(lang => {
        return lang.original.name
      })
    )
  })
}

const localeFlagDescription = `language code of the language. This can be in one of three forms:
- 'll', an ISO 639 two-letter language code (lowercase). See Language Codes for the list of codes.
- 'll_CC', where 'll' is an ISO 639 two-letter language code (lowercase) and 'CC' is an ISO 3166
  two-letter country code (uppercase). The country code specification is not redundant: Some languages
  have dialects in different countries. For example, 'de_AT' is used for Austria, and 'pt_BR' for Brazil.
  The country code serves to distinguish the dialects. See Language Codes and Country Codes for
  the lists of codes.
- 'll_CC@variant', where 'll' is an ISO 639 two-letter language code (lowercase), 'CC' is an ISO 3166
  two-letter country code (uppercase), and 'variant' is a variant designator. The variant designator
  (lowercase) can be a script designator, such as 'latin' or 'cyrillic'.
`

export default class Msginit extends Command {
  static description = 'Initialize language translation (*.po file for selected language)'

  static flags = {
    help: flags.help({
      char: 'h'
    }),
    locale: flags.string({
      char: 'l',
      description: localeFlagDescription,
    }),
    output: flags.string({
      char: 'o',
      // required: true,
      // default: 'i18n/locales/ru_RU/messages.po',
      description: '',
    }),
  }

  static args = [
    {
      name: 'file',
      required: true,
      description: 'Input *.pot file',
      default: 'i18n/messages.pot',
    }
  ]

  async run() {
    const {args, flags} = this.parse(Msginit)
    const {execSync} = child_process

    const answers = await inquirer
      .prompt([
        {
          type: 'autocomplete',
          name: 'languageCode',
          // @ts-ignore
          suggestOnly: false,
          message: 'Select language',
          source: searchLanguageCode,
          filter: val => {
            const lang = iso6393.find(lang => lang.name === val)
            return lang && lang.iso6391
          },
          when: () => !flags.locale
        },
      ])

    const locale: string = flags.locale || answers.languageCode
    const output: string = flags.output || path.join(path.dirname(args.file), `locales/${locale}.po`)

    mkpath(output)
      .then(() => {
        execSync(`msginit --input=${args.file} --locale=${locale} --no-wrap --no-translator --output-file=${output}`)
      })
      .catch((err: Error) => {
        if (err) throw err
      })
  }
}
