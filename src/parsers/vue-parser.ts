import {Attribute, Location, parse} from 'parse5'

import {ParserBase, SourceStringMetadataList} from '../common/parser-base'

import {JsParser} from './js-parser'

interface DefaultTreeNode {
  nodeName: string
  childNodes: DefaultTreeNode[]
  content: DefaultTreeNode
  value: string
  attrs: Attribute[]
  sourceCodeLocation: Location
}

// Document node body type guard
function isDocumentNode(node: DefaultTreeNode): node is DefaultTreeNode {
  return node.nodeName === '#document' && Array.isArray(node.childNodes)
}

const getVTDirective = (node: DefaultTreeNode) => {
  return node.attrs && node.attrs.find(attr => attr.name === 'v-t')
}

const getExpressionList = (text: string) => {
  const re = /{{(.+?)}}/g
  const matches = text.match(re)
  return matches ? matches.map(str => str.replace(/({{)|(}})/g, '').trim().split('|')[0]) : []
}

export class VueParser extends ParserBase {
  ast?: any

  constructor(filePath: string) {
    super(filePath)
  }

  parse() {
    this.ast = parse(typeof this.content === 'string' ? this.content : '', {
      sourceCodeLocationInfo: true,
    })
    if (this.ast && isDocumentNode(this.ast)) {
      const rootVueComponentNode = this.ast.childNodes[0].childNodes.find((node: DefaultTreeNode) => node.nodeName === 'head')
      const templateNode = rootVueComponentNode && rootVueComponentNode.childNodes.find((node: DefaultTreeNode) => node.nodeName === 'template')
      const scriptNode = rootVueComponentNode && rootVueComponentNode.childNodes.find((node: DefaultTreeNode) => node.nodeName === 'script')
      const templateRoot = templateNode && templateNode.content.childNodes.find((node: DefaultTreeNode) => node.nodeName !== '#text')
      const scriptContent = scriptNode && scriptNode.childNodes[0].value
      const scriptLocation = scriptNode && scriptNode.childNodes[0].sourceCodeLocation

      const jsParser = new JsParser(this.filePath)
      jsParser.setContent(scriptContent ? scriptContent : '', scriptLocation ? scriptLocation.startLine - 1 : 0)
      jsParser.parse()

      this.result = {...this.result, ...templateRoot && this.parseTemplateThree(templateRoot), ...jsParser.result}
    }
  }

  parseTemplateThree(ast: DefaultTreeNode) {
    let result: SourceStringMetadataList = {}

    /**
     * Custom localization directive
     * TODO: add object syntax
     */
    const vTdirective = getVTDirective(ast)
    const vTValue = vTdirective && vTdirective.value.search(/^'.+'$/) > -1 && vTdirective.value.replace(/^'|'$/g, '')
    if (vTValue) {
      result[vTValue] = {
        file: this.filePath,
        line: ast.sourceCodeLocation.startLine,
        origin: 'v-t string',
        type: 'singular',
        value: vTValue,
      }
    }

    if (ast.nodeName === 'i18n') {
      const pathAttr: Attribute | undefined = ast.attrs.find((attr: Attribute) => attr.name === 'path')
      const value = pathAttr && pathAttr.value

      if (value) {
        result[value] = {
          file: this.filePath,
          line: ast.sourceCodeLocation.startLine,
          origin: 'i18n component',
          type: 'singular',
          value,
        }
      }
    }

    ast.childNodes && ast.childNodes.forEach((childAst: DefaultTreeNode) => {
      if (childAst.nodeName === '#text') {
        /**
         * String interpolation
         */
        const textNodeValue = childAst.value && childAst.value.trim()
        const expressionList: string[] = textNodeValue ? getExpressionList(textNodeValue) : []
        expressionList.forEach(expression => {
          const jsParser = new JsParser(this.filePath)
          jsParser.setContent(expression, childAst.sourceCodeLocation.startLine - 1)
          jsParser.parse()

          result = {...result, ...jsParser.result}
        })
      } else {
        result = {...result, ...this.parseTemplateThree(childAst)}
      }
    })

    return result
  }
}
