import {SourceStringMetadataList} from '../../src/common/parser-base'

export const sampleSourceStringMetadataList: SourceStringMetadataList = {
  apple: {
    file: 'test/fixtures/xgettext/call-translate-plural.js',
    line: 8,
    origin: '$tc',
    type: 'plural',
    value: 'apple'
  },
  of: {
    file: 'test/fixtures/xgettext/call-translate-plural.js',
    line: 8,
    origin: '$t',
    type: 'singular',
    value: 'of'
  },
  open: {
    file: 'test/fixtures/xgettext/call-translate.js',
    line: 7,
    origin: '$t',
    type: 'singular',
    value: 'open'
  },
}

export const sampleGettext = `# SOME DESCRIPTIVE TITLE.
# Copyright (C) 2019
# This file is distributed under the same license as the vuettext package.
# V. Shimarulin <developer@test.com>, 2019.
#
#, fuzzy
msgid ""
msgstr ""
"Project-Id-Version: vuettext 0.1.0\\n"
"Report-Msgid-Bugs-To: developer@test.com\\n"
"POT-Creation-Date: 2019-01-13 11:31+0300\\n"
"PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE\\n"
"Last-Translator: V. Shimarulin <developer@test.com>\\n"
"Language-Team: none\\n"
"Language: \\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"

#: test/fixtures/xgettext/call-translate-plural.js:8
msgid "apple"
msgid_plural "apple"
msgstr[0] ""
msgstr[1] ""

#: test/fixtures/xgettext/call-translate-plural.js:8
msgid "of"
msgstr ""

#: test/fixtures/xgettext/call-translate.js:7
msgid "open"
msgstr ""

`

export const sampleJsFile = `const hi = $t('hi.key');

export class myClass {
  classFields = 'this is a class field'
}

export default {
  data: () => ({
    isVisible: false,
  }),
  computed: {
    status () {
      return this.isVisible ? this.$t('open') : this.$t('closed')
    },
  },
  methods: {
    toggle () {
      this.isVisible = !this.isVisible
    },

    hide () {
      this.isVisible = false
    },

    show () {
      this.isVisible = true
    },
  },
}
`
export const sampleMsgmergeOutputRu = `
i18n/locales/ru_RU.po:
Прочитано сообщений: старых 1 + новых 1; объединено 12, помечено неточными 1, недостающих 1, недействительных 1.
`
