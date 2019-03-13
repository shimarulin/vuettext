import * as child_process from 'child_process'
import * as moment from 'moment'

import {SourceStringMetadata, SourceStringMetadataList} from '../common/parser-base'

const pkg = require(`${process.cwd()}/package.json`)

const getHeader = () => {
  const date = moment()
  const dateFull = date.format('YYYY-MM-DD hh:mmZZ')
  const dateYear = date.format('YYYY')
  const {execSync} = child_process
  const userName = execSync('git config user.name').toString().trim()
  const userEmail = execSync('git config user.email').toString().trim()

  return `# Translations template for ${pkg.name} package.
# Copyright (C) ${dateYear}
# This file is distributed under the same license as the ${pkg.name} package.
# ${userName} <${userEmail}>, ${dateYear}.
#
msgid ""
msgstr ""
"Project-Id-Version: ${pkg.name} ${pkg.version}\\n"
"Report-Msgid-Bugs-To: ${userEmail}\\n"
"POT-Creation-Date: ${dateFull}\\n"
"PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE\\n"
"Last-Translator: ${userName} <${userEmail}>\\n"
"Language-Team: none\\n"
"Language: \\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"

`
}

const getMsgId = (item: SourceStringMetadata) => {
  return `#: ${item.file}:${item.line}
msgid "${item.value}"
msgstr ""

`
}

const getMsgIdPlural = (item: SourceStringMetadata) => {
  return `#: ${item.file}:${item.line}
msgid "${item.value}"
msgid_plural "${item.value}"
msgstr[0] ""
msgstr[1] ""

`
}

export const gettextFormatter = (items: SourceStringMetadataList) => {
  let content = getHeader()

  const compareByFileNameAndLine = (a: string, b: string) => {
    const compareFilePath = items[a].file.localeCompare(items[b].file)
    const compareLineNumber = items[a].line - items[b].line
    if (compareFilePath === 0 && compareLineNumber < 0) {
      return -1
    } else if (compareFilePath === 0 && compareLineNumber > 0) {
      return 1
    } else if (compareFilePath === 0 && compareLineNumber === 0) {
      return 0
    } else if (compareFilePath < 0) {
      return -1
    } else if (compareFilePath > 0) {
      return 1
    }
    return 0
  }

  const keys = Object.keys(items).sort(compareByFileNameAndLine)

  keys.map((key: string) => {
    if (items[key].type === 'singular') {
      content = content + getMsgId(items[key])
    } else {
      content = content + getMsgIdPlural(items[key])
    }
  })

  return content
}
