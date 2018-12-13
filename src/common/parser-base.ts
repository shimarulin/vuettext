import * as fs from 'fs'

type SourceStringType = 'singular' | 'plural'
type SourceStringOrigin = '$t' | '$tc'

export interface SourceStringMetadata {
  file: string
  type: SourceStringType
  origin: SourceStringOrigin
  line: number
  value: string
}

export interface SourceStringMetadataList {
  [key: string]: SourceStringMetadata
}

export class ParserBase {
  filePath: string
  stringLocationOffset: number
  content?: string
  result?: SourceStringMetadataList

  constructor(filePath: string) {
    this.filePath = filePath
    this.stringLocationOffset = 0
  }

  readFile() {
    this.content = fs.readFileSync(this.filePath).toString()
  }

  setContent(content: string, stringLocationOffset: number) {
    this.stringLocationOffset = stringLocationOffset
    this.content = content
  }
}
