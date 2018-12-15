import * as child_process from 'child_process'
import * as debug from 'debug'
import {expect, fancy} from 'fancy-test'
import {fn as momentProto} from 'moment'

import {gettextFormatter} from '../../src/formatters/gettext-formatter'
import {sampleGettext, sampleSourceStringMetadataList} from '../fixtures/samples'

// Run tests with env DEBUG=execSync
// DEBUG=execSync yarn test
const log = debug('execSync')

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
      log('execSync string: ', str)
      if (str === 'git config user.name') {
        return Buffer.from('V. Shimarulin', 'utf8')
      } else if (str === 'git config user.email') {
        return Buffer.from('developer@test.com', 'utf8')
      }
    })
    .add('content', () => {
      return gettextFormatter(sampleSourceStringMetadataList)
    })
    .it('gettext format', ctx => {
      expect(ctx.content).to.equal(sampleGettext)
    })
})
