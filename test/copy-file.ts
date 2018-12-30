import * as fs from 'fs'
import * as path from 'path'

export const copy = async (src: string, dest: string) => {
  return new Promise(resolve => {
    const dirPath = path.dirname(dest)
    fs.mkdir(dirPath, {
      recursive: true,
    }, (err: Error) => {
      if (err) throw err

      fs.copyFile(src, dest, err => {
        if (err) throw err
        resolve()
      })
    })
  })
}
