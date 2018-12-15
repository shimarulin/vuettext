import * as debug from 'debug'
import {expect, fancy} from 'fancy-test'

// Run tests with env DEBUG=ctx
// DEBUG=ctx yarn test
const log = debug('vue_parser')

import {VueParser} from '../../src/parsers/vue-parser'

describe('VueParser', () => {
  fancy
    .add('parser', () => new VueParser('test/fixtures/inline.vue'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse inline call $t in Vue single file component', ctx => {
      log(ctx.parser.result)
      expect(ctx.parser.result).to.deep.equal({
        inline: {
          file: 'test/fixtures/inline.vue',
          line: 2,
          origin: '$t',
          type: 'singular',
          value: 'inline'
        }
      })
    })

  fancy
    .add('parser', () => new VueParser('test/fixtures/inline-plural.vue'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse inline call $tc in Vue single file component', ctx => {
      log(ctx.parser.result)
      expect(ctx.parser.result).to.deep.equal({
        'inline-plural': {
          file: 'test/fixtures/inline-plural.vue',
          line: 2,
          origin: '$tc',
          type: 'plural',
          value: 'inline-plural'
        }
      })
    })

  fancy
    .add('parser', () => new VueParser('test/fixtures/component-interpolation.vue'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse i18n component interpolation in Vue single file component', ctx => {
      log(ctx.parser.result)
      expect(ctx.parser.result).to.deep.equal({
        term: {
          file: 'test/fixtures/component-interpolation.vue',
          line: 4,
          origin: 'i18n component',
          type: 'singular',
          value: 'term'
        },
        tos: {
          file: 'test/fixtures/component-interpolation.vue',
          line: 5,
          origin: '$t',
          type: 'singular',
          value: 'tos'
        }
      })
    })

  fancy
    .add('parser', () => new VueParser('test/fixtures/component-interpolation.vue'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse advanced example of i18n component interpolation in Vue single file component', ctx => {
      log(ctx.parser.result)
      expect(ctx.parser.result).to.deep.equal({
        term: {
          file: 'test/fixtures/component-interpolation.vue',
          line: 4,
          origin: 'i18n component',
          type: 'singular',
          value: 'term'
        },
        tos: {
          file: 'test/fixtures/component-interpolation.vue',
          line: 5,
          origin: '$t',
          type: 'singular',
          value: 'tos'
        }
      })
    })

  fancy
    .add('parser', () => new VueParser('test/fixtures/directive.vue'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse custom v-t directive with string value in Vue single file component', ctx => {
      log(ctx.parser.result)
      expect(ctx.parser.result).to.deep.equal({
        description: {
          file: 'test/fixtures/directive.vue',
          line: 3,
          origin: 'v-t string',
          type: 'singular',
          value: 'description'
        }
      })
    })
})
