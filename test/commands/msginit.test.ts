import {expect, test} from '@oclif/test'
// import * as del from 'del'
import * as inquirer from 'inquirer'

import * as debug from 'debug'
import * as fg from 'fast-glob'
import * as fs from 'fs'

// Run tests with env DEBUG=ctx
// DEBUG=ctx yarn test
const log = debug('fs')

import {execCommand} from '../exec-command'

describe('msginit', async () => {
  before(async () => {
    await execCommand('xgettext')
    const currentDir = fs.readdirSync('./')
    const fileList: string[] = await fg(['**/*.pot'])
    log(currentDir)
    log(fileList)
  })

  after(async () => {
    // await del('i18n')
  })

  test
    .stub(inquirer, 'prompt', () => Promise.resolve({languageCode: 'ru'}))
    .stub(inquirer, 'registerPrompt', () => {
      return true
    })
    .stdout()
    .command(['msginit'])
    .it('runs msginit without args', async ctx => {
      expect(ctx.stdout).to.contain('i18n/locales/ru.po.')
    })

  test
    .stdout()
    .command(['msginit', '--locale', 'ru_RU'])
    .it('runs  msginit --locale=ru_RU', async ctx => {
      expect(ctx.stdout).to.contain('i18n/locales/ru_RU.po.')
    })
})
