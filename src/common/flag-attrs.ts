type DescriptionType =
  | 'PATH'
  | 'GLOB'
  | 'IGNORE'

type DefaultValueType =
  | 'MESSAGES'
  | 'MESSAGES_DIR'
  | 'LOCALES'
  | 'LOCALES_DIR'
  | 'REFERENCE'

export const getDescription = (descriptionType: DescriptionType, spec?: string): string => {
  switch (descriptionType) {
  case 'PATH':
    return `Path to ${spec}`
  case 'GLOB':
    return `Glob pattern to specify ${spec} files. Expected string or separated comma strings
Needs to be surrounded with quotes to prevent shell globbing.
Guide to globs: https://github.com/isaacs/node-glob#glob-primer`
  case 'IGNORE':
    return `Glob pattern to specify ignored files.
Expected string or separated comma strings`
  default:
    return ''
  }
}

export const getDefaultValue = (defaultValueType: DefaultValueType): string => {
  const i18nDir = 'i18n'
  const localesDir = `${i18nDir}/locales`
  const messagesDir = `${i18nDir}/messages`

  switch (defaultValueType) {
  case 'LOCALES':
    return `${localesDir}/*.json`
  case 'LOCALES_DIR':
    return localesDir
  case 'MESSAGES':
    return `${messagesDir}/*.po`
  case 'MESSAGES_DIR':
    return messagesDir
  case 'REFERENCE':
    return `${i18nDir}/messages.pot`
  default:
    return ''
  }
}
