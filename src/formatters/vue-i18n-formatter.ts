import {Item} from 'pofile'

type VueI18nLocale = {
  [key: string]: object | string
}

export const vueI18nFormatter = (items: Item[]) => {
  let content: VueI18nLocale = {}

  items.forEach(item => {
    /**
     * TODO: Check and remove dot from end of msgid string
     * TODO: Create nested fields
     */
    if (typeof item.msgid_plural === 'string') {
      content[item.msgid] = item.msgstr.join(' | ')
    } else {
      content[item.msgid] = item.msgstr.join('')
    }

  })

  return JSON.stringify(content, null, ' ')
}
