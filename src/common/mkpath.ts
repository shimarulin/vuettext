import * as fs from 'fs'
import * as path from 'path'

export const mkpath = (filePath: string) => {
  return new Promise(resolve => {
    const dirPath = path.dirname(filePath)
    fs.mkdir(dirPath, {
      recursive: true,
    }, (err: Error) => {
      if (err) throw err
      resolve()
    })
  })
}
