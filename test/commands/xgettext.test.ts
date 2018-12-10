import {expect, test} from '@oclif/test'
import * as debug from 'debug'

// Run tests with env DEBUG=ctx
// DEBUG=ctx yarn test
const log = debug('ctx')

describe('xgettext', () => {
  test
    .stdout()
    .command(['xgettext'])
    .it('runs xgettext without args', ctx => {
      log(Object.keys(ctx))
      log(ctx.stdout)
      expect(ctx.stdout).to.contain('**/*.{js,vue}')
      expect(ctx.stdout).to.contain('messages.pot')
    })

  test
    .stdout()
    .command(['xgettext', '--output', 'locales/msg.pot'])
    .it('runs xgettext --output locales/msg.pot', ctx => {
      log(ctx.stdout)
      expect(ctx.stdout).to.contain('locales/msg.pot')
    })

  test
    .stdout()
    .command(['xgettext', 'src/**/*.vue'])
    .it('runs xgettext src/**/*.vue', ctx => {
      log(ctx.stdout)
      expect(ctx.stdout).to.contain('src/**/*.vue')
    })

  test
    .stdout()
    .command(['xgettext', '--output', 'locales/msg.pot', 'src/**/*.vue'])
    .it('runs xgettext --output locales/msg.pot src/**/*.vue', ctx => {
      log(ctx.stdout)
      expect(ctx.stdout).to.contain('locales/msg.pot')
      expect(ctx.stdout).to.contain('src/**/*.vue')
    })
})
