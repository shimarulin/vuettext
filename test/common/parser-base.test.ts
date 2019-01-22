import {expect, fancy} from 'fancy-test'

import {ParserBase} from '../../src/common/parser-base'
import {sampleJsFile} from '../fixtures/samples'

describe('ParserBase', () => {
  fancy
    .add('parser', () => new ParserBase('test/fixtures/xgettext/call-translate.js'))
    .it('create new parser', ctx => {
      expect(ctx.parser).to.deep.equal({
        filePath: 'test/fixtures/xgettext/call-translate.js',
        stringLocationOffset: 0
      })
    })

  fancy
    .add('parser', () => new ParserBase('test/fixtures/xgettext/call-translate.js'))
    .do(ctx => {
      ctx.parser.readFile()
    })
    .it('read file', ctx => {
      expect(ctx.parser).to.deep.equal({
        filePath: 'test/fixtures/xgettext/call-translate.js',
        stringLocationOffset: 0,
        content: sampleJsFile
      })
    })

  fancy
    .add('parser', () => new ParserBase('test/fixtures/xgettext/call-translate.js'))
    .do(ctx => {
      ctx.parser.setContent('$t(\'example\')', 20)
    })
    .it('set content', ctx => {
      expect(ctx.parser).to.deep.equal({
        filePath: 'test/fixtures/xgettext/call-translate.js',
        stringLocationOffset: 20,
        content: '$t(\'example\')'
      })
    })
})
