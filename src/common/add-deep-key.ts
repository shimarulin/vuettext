interface DeepObj {
  [key: string]: object | string
}

export const addDeepKey = (obj: DeepObj, keyString: string, value: string) => {
  /**
   * Split key by dot's except leading and ending dot
   */
  const keys: string[] = keyString.split(/(?!^)\.(?!$)/g)
  let referrer: DeepObj = obj
  keys.forEach((key, idx) => {
    if (idx < keys.length - 1) {
      const v = {}
      obj[key] = v
      referrer = v
    } else {
      referrer[key] = value
    }
  })
}
