import * as fs from 'fs'
import * as path from 'path'

export const writeFile = (filePath: string, data: string) => {
  return new Promise(resolve => {
    const dirPath = path.dirname(filePath)
    fs.mkdir(dirPath, {
      recursive: true,
    }, (err: Error) => {
      if (err) throw err
      fs.writeFileSync(filePath, data)
      resolve()
    })
  })
}
