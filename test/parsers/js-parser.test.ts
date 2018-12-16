import {expect, fancy} from 'fancy-test'

import {JsParser} from '../../src/parsers/js-parser'

describe('JsParser', () => {
  fancy
    .add('parser', () => new JsParser('test/fixtures/call-translate.js'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse file', ctx => {
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
    .it('parse string', ctx => {
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

  fancy
    .add('parser', () => new JsParser('test/fixtures/call-translate-plural.js'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse string literal', ctx => {
      expect(ctx.parser.result).to.deep.equal({
        of: {
          file: 'test/fixtures/call-translate-plural.js',
          line: 8,
          origin: '$t',
          type: 'singular',
          value: 'of'
        },
        apple: {
          file: 'test/fixtures/call-translate-plural.js',
          line: 8,
          origin: '$tc',
          type: 'plural',
          value: 'apple'
        },
      })
    })
})
