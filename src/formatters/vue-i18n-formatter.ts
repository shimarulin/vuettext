import {Item} from 'pofile'

import {addDeepKey} from '../common/add-deep-key'

type VueI18nLocale = {
  [key: string]: object | string
}

export const vueI18nFormatter = (items: Item[]) => {
  let content: VueI18nLocale = {}

  items.forEach(item => {
    addDeepKey(
      content,
      item.msgid,
      item.msgstr.join(typeof item.msgid_plural === 'string' ? ' | ' : '')
    )
  })

  return `${JSON.stringify(content, null, '  ')}\n`
}
