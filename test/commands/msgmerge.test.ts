import {expect, test} from '@oclif/test'

describe('msgmerge', () => {
  test
    .stdout()
    .command(['msgmerge'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['msgmerge', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
