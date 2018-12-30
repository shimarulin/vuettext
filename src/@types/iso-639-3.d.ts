declare module 'iso-639-3' {
  interface Language {
    name: string,
    type: 'living' | 'historical' | 'extinct' | 'ancient' | 'constructed' | 'special',
    scope: 'individual' | 'special' | 'macrolanguage',
    iso6393: string | null,
    iso6392B: string | null,
    iso6392T: string | null,
    iso6391: string | null
  }

  let LanguageList: Language[]
  export = LanguageList
}
