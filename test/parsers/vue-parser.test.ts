import {expect, fancy} from 'fancy-test'

import {VueParser} from '../../src/parsers/vue-parser'

describe('VueParser', () => {
  fancy
    .add('parser', () => new VueParser('test/fixtures/xgettext/inline.vue'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse inline call $t in Vue single file component', ctx => {
      expect(ctx.parser.result).to.deep.equal({
        inline: {
          file: 'test/fixtures/xgettext/inline.vue',
          line: 2,
          origin: '$t',
          type: 'singular',
          value: 'inline'
        }
      })
    })

  fancy
    .add('parser', () => new VueParser('test/fixtures/xgettext/inline-plural.vue'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse inline call $tc in Vue single file component', ctx => {
      expect(ctx.parser.result).to.deep.equal({
        'inline-plural': {
          file: 'test/fixtures/xgettext/inline-plural.vue',
          line: 2,
          origin: '$tc',
          type: 'plural',
          value: 'inline-plural'
        }
      })
    })

  fancy
    .add('parser', () => new VueParser('test/fixtures/xgettext/component-interpolation.vue'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse i18n component interpolation in Vue single file component', ctx => {
      expect(ctx.parser.result).to.deep.equal({
        term: {
          file: 'test/fixtures/xgettext/component-interpolation.vue',
          line: 4,
          origin: 'i18n component',
          type: 'singular',
          value: 'term'
        },
        tos: {
          file: 'test/fixtures/xgettext/component-interpolation.vue',
          line: 5,
          origin: '$t',
          type: 'singular',
          value: 'tos'
        }
      })
    })

  fancy
    .add('parser', () => new VueParser('test/fixtures/xgettext/component-interpolation.vue'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse advanced example of i18n component interpolation in Vue single file component', ctx => {
      expect(ctx.parser.result).to.deep.equal({
        term: {
          file: 'test/fixtures/xgettext/component-interpolation.vue',
          line: 4,
          origin: 'i18n component',
          type: 'singular',
          value: 'term'
        },
        tos: {
          file: 'test/fixtures/xgettext/component-interpolation.vue',
          line: 5,
          origin: '$t',
          type: 'singular',
          value: 'tos'
        }
      })
    })

  fancy
    .add('parser', () => new VueParser('test/fixtures/xgettext/directive.vue'))
    .do(ctx => {
      ctx.parser.readFile()
      ctx.parser.parse()
    })
    .it('parse custom v-t directive with string value in Vue single file component', ctx => {
      expect(ctx.parser.result).to.deep.equal({
        description: {
          file: 'test/fixtures/xgettext/directive.vue',
          line: 3,
          origin: 'v-t string',
          type: 'singular',
          value: 'description'
        }
      })
    })
})
