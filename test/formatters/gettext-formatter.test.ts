import * as child_process from 'child_process'
import {expect, fancy} from 'fancy-test'
import {fn as momentProto} from 'moment'
const pkg = require(`${process.cwd()}/package.json`)

import {gettextFormatter} from '../../src/formatters/gettext-formatter'
import {sampleGettext, sampleSourceStringMetadataList} from '../fixtures/samples'

describe('gettextFormatter', () => {
  fancy
    .stub(momentProto, 'format', (str: string) => {
      if (str === 'YYYY-MM-DD hh:mmZZ') {
        return '2019-01-13 11:31+0300'
      } else if (str === 'YYYY') {
        return '2019'
      }
    })
    .stub(child_process, 'execSync', (str: string) => {
      if (str === 'git config user.name') {
        return Buffer.from('V. Shimarulin', 'utf8')
      } else if (str === 'git config user.email') {
        return Buffer.from('developer@test.com', 'utf8')
      }
    })
    .stub(pkg, 'version', '0.1.0')
    .add('content', () => {
      return gettextFormatter(sampleSourceStringMetadataList)
    })
    .it('gettext format', ctx => {
      expect(ctx.content).to.equal(sampleGettext)
    })
})
