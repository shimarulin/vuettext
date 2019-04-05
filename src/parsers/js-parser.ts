import {Node, Parser, Token} from 'acorn'
import dynamicImport from 'acorn-dynamic-import'

import {ParserBase, SourceStringMetadataList} from '../common/parser-base'

const classFields = require('acorn-class-fields')

interface Property {
  name: string
}

interface Callee {
  name: string
  type: string
  property: Property
}

interface Arguments extends Token {
  properties: any[]
}

interface Expression {
  // tslint:disable-next-line:no-banned-terms
  callee: Callee
  // tslint:disable-next-line:no-banned-terms
  arguments: Arguments[]
  right?: Expression
}

interface RootNode extends Node {
  body?: Node[]
  sourceType?: string
}

interface ChildNode extends Node {
  body?: ChildNode | ChildNode[]
  declaration?: ChildNode
  declarations?: ChildNode[]
  properties?: ChildNode[]
  value?: ChildNode
  argument?: any
  test?: any
  expression?: any
  // tslint:disable-next-line:no-banned-terms
  callee?: any,
  init?: any
}

// Child node body type guard
function hasBodyNodesArray(body: ChildNode | ChildNode[]): body is ChildNode[] {
  return Array.isArray(body as ChildNode)
}

export class JsParser extends ParserBase {
  ast?: RootNode

  constructor(filePath: string) {
    super(filePath)
  }

  parse() {
    this.ast = Parser.extend(
      dynamicImport,
      classFields,
    ).parse(typeof this.content === 'string' ? this.content : '', {
      ecmaVersion: 9,
      sourceType: 'module',
      locations: true,
    })

    this.ast.body !== undefined && this.ast.body.forEach((node: ChildNode) => {
      this.result = {...this.result, ...this.parseNode(node)}
    })
    this.stringLocationOffset = 0
  }

  parseNode(node: ChildNode): SourceStringMetadataList {
    let result = {}
    if (node.declarations) {
      node.declarations.forEach(declaration => {
        result = {...result, ...this.parseNode(declaration)}
      })
    } else if (node.declaration) {
      result = {...result, ...this.parseNode(node.declaration)}
    } else if (node.properties) {
      node.properties.forEach(childNode => {
        result = {...result, ...this.parseNode(childNode)}
      })
    } else if (node.value) {
      result = {...result, ...this.parseNode(node.value)}
    } else if (node.body) {
      if (!hasBodyNodesArray(node.body) && node.body.properties) {
        result = {...result, ...this.parseNode(node.body)}
      } else if (
        !hasBodyNodesArray(node.body) &&
        node.body.body &&
        hasBodyNodesArray(node.body.body) &&
        Array.isArray(node.body.body)
      ) {
        node.body.body.forEach(childNode => {
          result = {...result, ...this.parseNode(childNode)}
        })
      } else if (
        !hasBodyNodesArray(node.body) &&
        node.body.body &&
        hasBodyNodesArray(node.body.body)
      ) {
        node.body.body.forEach(childNode => {
          result = {...result, ...this.parseNode(childNode)}
        })
      }
    } else if (node.argument || node.test) {
      const cond = node.argument || node
      if (cond.consequent) {
        if (cond.consequent.callee) {
          result = {...result, ...this.parseExpression(cond.consequent)}
        } else if (cond.consequent.body) {
          cond.consequent.body.forEach((childNode: ChildNode) => {
            result = {...result, ...this.parseNode(childNode)}
          })
        }
      }
      if (cond.alternate && cond.alternate.callee) {
        if (cond.alternate.callee) {
          result = {...result, ...this.parseExpression(cond.alternate)}
        } else if (cond.alternate.body) {
          cond.alternate.body.forEach((childNode: ChildNode) => {
            result = {...result, ...this.parseNode(childNode)}
          })
        }
      }
      if (cond.expressions) {
        cond.expressions.forEach((expression: Expression) => {
          result = {...result, ...this.parseExpression(expression)}
        })
      }
    } else if (node.init && node.init.callee) {
      result = {...result, ...this.parseExpression(node.init)}
    } else if (node.expression && node.expression.callee) {
      result = {...result, ...this.parseExpression(node.expression)}
    } else if (node.expression && node.expression.type === 'AssignmentExpression') {
      result = {...result, ...this.parseExpression(node.expression.right)}
    }
    return result
  }

  parseExpression(expression: Expression): SourceStringMetadataList {
    let result: SourceStringMetadataList = {}

    if (!expression.callee) {
      return result
    }

    const isMember = expression.callee.type && expression.callee.type === 'MemberExpression'

    const name = isMember ? expression.callee.property.name : expression.callee.name
    if (name === '$t') {
      const value = expression.arguments[0].value
      result[value] = {
        file: this.filePath,
        line: expression.arguments[0].loc ? expression.arguments[0].loc.start.line + this.stringLocationOffset : 0,
        origin: '$t',
        type: 'singular',
        value,
      }
    } else if (name === '$tc') {
      const value = expression.arguments[0].value
      result[value] = {
        file: this.filePath,
        line: expression.arguments[0].loc ? expression.arguments[0].loc.start.line + this.stringLocationOffset : 0,
        origin: '$tc',
        type: 'plural',
        value,
      }
      if (expression.arguments[2]) {
        expression.arguments[2].properties.forEach(property => {
          result = {...result, ...(property.value.type === 'CallExpression' ? this.parseExpression(property.value) : {})}
        })
      }
    }
    return result
  }
}
