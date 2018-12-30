import * as fs from 'fs'

import {mkpath} from './mkpath'

export const writeFile = (filePath: string, data: string) => {
  return new Promise(resolve => {
    mkpath(filePath)
      .then(() => {
        fs.writeFileSync(filePath, data)
        resolve()
      })
      .catch((err: Error) => {
        if (err) throw err
      })
  })
}
