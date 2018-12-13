import * as debug from 'debug'
import {expect, fancy} from 'fancy-test'

// Run tests with env DEBUG=ctx
// DEBUG=ctx yarn test
const log = debug('ctx')

import {JsParser} from '../../src/parsers/js-parser'

describe('JsParser', () => {
  fancy
    .add('parser', () => new JsParser('test/fixtures/call-translate.js'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('read file and parse', ctx => {
      log(ctx.parser.result)
      expect(ctx.parser.result).to.deep.equal({
        open: {
          file: 'test/fixtures/call-translate.js',
          line: 7,
          origin: '$t',
          type: 'singular',
          value: 'open'
        },
        closed: {
          file: 'test/fixtures/call-translate.js',
          line: 7,
          origin: '$t',
          type: 'singular',
          value: 'closed'
        }
      })
    })

  fancy
    .add('parser', () => new JsParser('test/fixtures/inline.vue'))
    .do(ctx => {
      ctx.parser.setContent('$t(\'example\')', 1)
      ctx.parser.parse()
    })
    .it('set content and parse', ctx => {
      log(ctx.parser.result)
      expect(ctx.parser.result).to.deep.equal({
        example: {
          file: 'test/fixtures/inline.vue',
          line: 2,
          origin: '$t',
          type: 'singular',
          value: 'example'
        },
      })
    })
})
