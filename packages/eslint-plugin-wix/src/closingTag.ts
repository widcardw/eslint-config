import { Rule } from 'eslint'

export const closingTag: Rule.RuleModule = {
  meta: {
    fixable: 'code'
  },
  create(context) {
    return {
      JSXOpeningElement(node: Rule.Node) {
        const { start, end } = node.loc!
        const jsxAttributes: Array<Rule.Node> | undefined = (node as any).attributes
        const lineBreaks = end.line - start.line
        if (typeof jsxAttributes === 'undefined' || jsxAttributes.length === 0) {
          if (lineBreaks >= 1) {
            context.report({
              node,
              message: `Expect no line break before closing bracket, but ${lineBreaks} line break${lineBreaks > 1 ? 's' : ''} found.`,
              fix(fixer) {
                const tag: string = (node as any).name.name
                return fixer.replaceTextRange([node.range![0], node.range![1]], `<${tag}>`)
              }
            })
          }
          return
        }
        // // Maybe it's hard to remove the line breaks between attrs...
        // for (let i = 0; i < jsxAttributes.length - 1; i++) {
        //   const loc0 = jsxAttributes[i].loc!
        //   const loc1 = jsxAttributes[i + 1].loc!
        //   const lineBreaks2 = loc1.start.line - loc0.end.line
        //   if (lineBreaks2 > 1) {
        //     context.report({
        //       node,
        //       message: `Expect no line break between attributes, but ${lineBreaks2 - 1} line break${lineBreaks2 > 2 ? 's' : ''} found.`,
        //     })
        //   }
        // }
        const locLastAttr = jsxAttributes[jsxAttributes.length - 1].loc!
        const lineBreaks3 = end.line - locLastAttr.end.line
        if (lineBreaks3 >= 1 && start.line === locLastAttr.end.line) {
          context.report({
            node,
            message: `Expect no line break before closing bracket, but ${lineBreaks3} line break${lineBreaks3 > 1 ? 's' : ''} found.`,
            fix(fixer) {
              const endPoint = node.range![1]
              return fixer.removeRange([endPoint - end.column - lineBreaks3, endPoint - 1])
            }
          })
        }
        else if (lineBreaks3 > 1) {
          context.report({
            node,
            message: `Expect no line break before closing bracket, but ${lineBreaks3 - 1} line break${lineBreaks3 > 2 ? 's' : ''} found.`,
            fix(fixer) {
              const endPoint = node.range![1]
              return fixer.replaceTextRange([endPoint - end.column - lineBreaks3 + 1, endPoint - 1], ''.padEnd(start.column, ' '))
            }
          })
        }
        if (lineBreaks > 1 && end.column - start.column !== 1) {
          context.report({
            node,
            message: 'JSX Opening Element closing escape must be aligned to opening escape',
            fix(fixer) {
              const endPoint = node.range![1]
              return fixer.replaceTextRange([endPoint - end.column, endPoint - 1], ''.padEnd(start.column, ' '))
            }
          })
        }
      }
    }
  }
}
