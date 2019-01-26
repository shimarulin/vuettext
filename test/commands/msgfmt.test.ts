import {expect, test} from '@oclif/test'
import * as del from 'del'
import * as fs from 'fs'

import {copy} from '../copy-file'

describe('msgfmt', async () => {
  before(async () => {
    await copy('test/fixtures/msgfmt/ru_RU.po', 'i18n/messages/ru_RU.po')
    await copy('test/fixtures/msgfmt/en_US.po', 'i18n/messages/en_US.po')
  })

  after(async () => {
    await del('i18n')
  })

  test
    .stdout()
    .command(['msgfmt'])
    .it('runs msgfmt without args', async ctx => {
      const resultRu = fs.readFileSync('i18n/locales/ru_RU.json').toString()
      const expectedRu = fs.readFileSync('test/fixtures/msgfmt/ru_RU.json').toString()
      const resultEn = fs.readFileSync('i18n/locales/en_US.json').toString()
      const expectedEn = fs.readFileSync('test/fixtures/msgfmt/en_US.json').toString()

      expect(resultRu).to.equal(expectedRu)
      expect(resultEn).to.equal(expectedEn)
      expect(ctx.stdout).to.contain('Saved 13 items to i18n/locales/en_US.json')
      expect(ctx.stdout).to.contain('Saved 13 items to i18n/locales/ru_RU.json')
    })
})
