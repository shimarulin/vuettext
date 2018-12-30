import * as child_process from 'child_process'

export const execCommand = async (command: string) => {
  const {exec} = child_process

  return new Promise(resolve => {
    exec(
      `node bin/run ${command}`, err => {
        if (err) throw err
        resolve()
      }
      )
  })
}
