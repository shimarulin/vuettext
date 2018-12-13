import * as debug from 'debug'
import {expect, fancy} from 'fancy-test'

import {ParserBase} from '../../src/common/parser-base'
import {sampleJsFile} from '../fixtures/samples'

// Run tests with env DEBUG=ctx
// DEBUG=ctx yarn test
const log = debug('ctx')

describe('ParserBase', () => {
  fancy
    .add('parser', () => new ParserBase('test/fixtures/call-translate.js'))
    .it('create new parser', ctx => {
      log(ctx.parser)
      expect(ctx.parser).to.deep.equal({
        filePath: 'test/fixtures/call-translate.js',
        stringLocationOffset: 0
      })
    })

  fancy
    .add('parser', () => new ParserBase('test/fixtures/call-translate.js'))
    .do(ctx => {
      ctx.parser.readFile()
    })
    .it('read file', ctx => {
      log(ctx.parser)
      expect(ctx.parser).to.deep.equal({
        filePath: 'test/fixtures/call-translate.js',
        stringLocationOffset: 0,
        content: sampleJsFile
      })
    })

  fancy
    .add('parser', () => new ParserBase('test/fixtures/call-translate.js'))
    .do(ctx => {
      ctx.parser.setContent('$t(\'example\')', 20)
    })
    .it('set content', ctx => {
      log(ctx.parser)
      expect(ctx.parser).to.deep.equal({
        filePath: 'test/fixtures/call-translate.js',
        stringLocationOffset: 20,
        content: '$t(\'example\')'
      })
    })
})
