import {expect, test} from '@oclif/test'
import * as del from 'del'
import * as fs from 'fs'

import {copy} from '../copy-file'

describe('msgmerge', async () => {
  before(async () => {
    await copy('test/fixtures/msgmerge/messages.pot', 'i18n/messages.pot')
    await copy('test/fixtures/msgmerge/ru_RU_outdated.po', 'i18n/locales/ru_RU.po')
    await copy('test/fixtures/msgmerge/en_US_outdated.po', 'i18n/locales/en_US.po')
  })

  after(async () => {
    await del('i18n')
  })

  test
    .stdout()
    .command(['msgmerge'])
    .it('runs msgmerge without args', async ctx => {
      const resultRu = fs.readFileSync('i18n/locales/ru_RU.po').toString()
      const expectedRu = fs.readFileSync('test/fixtures/msgmerge/ru_RU_updated.po').toString()
      const resultEn = fs.readFileSync('i18n/locales/en_US.po').toString()
      const expectedEn = fs.readFileSync('test/fixtures/msgmerge/en_US_updated.po').toString()

      expect(resultRu).to.equal(expectedRu)
      expect(resultEn).to.equal(expectedEn)
      expect(ctx.stdout).to.contain('Read 1 old + 1 reference, merged 12, fuzzied 1, missing 1, obsolete 1.')
    })
})
