import {Command, flags} from '@oclif/command'
import * as child_process from 'child_process'
import * as fg from 'fast-glob'

import {fillList} from '../common/fill-list'

const ignoreFlagDescription = `Glob pattern to specify ignored files
Expected string or separated comma strings`

const referenceFlagDescription = 'Path to updated reference file (*.pot template)'

const definitionFlagDescription = `Glob pattern to specify message *.po files. Expected string or separated comma strings
Needs to be surrounded with quotes to prevent shell globbing.
Guide to globs: https://github.com/isaacs/node-glob#glob-primer`

interface OutputMessageDefinition {
  file: string
  message: string
}

export default class Msgmerge extends Command {
  static description = 'Merge outdated messages (*.po files) and updated *.pot template'

  static flags = {
    help: flags.help({
      char: 'h'
    }),
    ignore: flags.string({
      description: ignoreFlagDescription
    }),
    ref: flags.string({
      char: 'r',
      required: true,
      default: 'i18n/messages.pot',
      description: referenceFlagDescription,
    }),
    def: flags.string({
      char: 'd',
      required: true,
      default: 'i18n/locales/*.po',
      description: definitionFlagDescription,
    }),
  }

  async run() {
    const {flags} = this.parse(Msgmerge)

    const ignoreList: string[] = ['node_modules']
    const patternList: string[] = []

    fillList(patternList, flags.def)

    if (flags.ignore) {
      fillList(ignoreList, flags.ignore)
    }

    const {exec} = child_process

    try {
      const fileList: string[] = await fg(patternList, {ignore: ignoreList})
      const outputMessageDefinitionList: Promise<OutputMessageDefinition>[] = []

      fileList.forEach((filePath: string) => {
        const outputMessageDefinitionPromise: Promise<OutputMessageDefinition> = new Promise(resolve => {
          exec(
            `LANG=en_US msgmerge --no-wrap --sort-by-file --update --verbose --quiet ${filePath} ${flags.ref}`,
            // tslint:disable-next-line:no-unused
            (err, stdout, stderr) => {
              if (err) throw err

              /**
               * Unexpected behavior: msgmerge always returns result to stderr
               */
              resolve({
                file: `File ${filePath}:`,
                message: stderr.trim()
              })
            })
        })
        outputMessageDefinitionList.push(outputMessageDefinitionPromise)
      })

      const outputMessage = await Promise.all(outputMessageDefinitionList)
        .then((results: OutputMessageDefinition[]) => {
          return results
            .map(item => `${item.file}\n${item.message}`)
            .join('\n')
        })
      this.log(outputMessage)
    } catch (e) {
      this.log(e)
    }
  }
}
