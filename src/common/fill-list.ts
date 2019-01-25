export const fillList = (target: string[], src: string) => {
  src
    .split(/,(?!\w+})/g)
    .map((item: string) => item.trim())
    .forEach((item: string) => { target.push(item) })
}
