import { Rule } from "eslint";

function reportTagOnly(context: Rule.RuleContext, node: Rule.Node, lineBreaks: number) {
  const openingElement: Rule.Node = (node as any).openingElement
  context.report({
    node: openingElement,
    message: `Expect no line break before closing bracket, but ${lineBreaks} line break${lineBreaks > 1 ? 's' : ''} found.`,
    fix(fixer) {
      const tag: string = (openingElement as any).name.name
      return fixer.replaceTextRange([node.range![0], node.range![1]], `<${tag} />`)
    }
  })
}

function reportInlineTagWithAttrs(context: Rule.RuleContext, node: Rule.Node, lineBreaks: number) {
  const openingElement: Rule.Node = (node as any).openingElement
  context.report({
    node: openingElement,
    message: `Expect no line break before closing bracket, but ${lineBreaks} line break${lineBreaks > 1 ? 's' : ''} found.`,
    fix(fixer) {
      const endPoint = node.range![1]
      let startPoint = endPoint - openingElement.loc!.end.column - lineBreaks
      if ((node as any).closingElement !== null) {
        const tag: string = (openingElement as any).name.name
        startPoint -= 3 + tag.length
      }
      return fixer.replaceTextRange([startPoint, endPoint], ' />')
    }
  })
}

function reportMultilineTagWithAttrs(context: Rule.RuleContext, node: Rule.Node, lineBreaks: number) {
  const openingElement: Rule.Node = (node as any).openingElement
  context.report({
    node: openingElement,
    message: `Expect no line break before closing bracket, but ${lineBreaks - 1} line break${lineBreaks > 2 ? 's' : ''} found.`,
    fix(fixer) {
      const endPoint = node.range![1]
      const endCol: number = openingElement.loc!.end.column
      let startPoint = endPoint - endCol - lineBreaks + 1
      if ((node as any).closingElement !== null) {
        const tag: string = (openingElement as any).name.name
        startPoint -= 3 + tag.length
      }
      return fixer.replaceTextRange([startPoint, endPoint], ''.padEnd(openingElement.loc!.start.column, ' ') + '/>')
    }
  })
}

function reportSelfCloseMultiLineWrongIndent(context: Rule.RuleContext, node: Rule.Node) {
  const openingElement: Rule.Node = (node as any).openingElement
  context.report({
    node: openingElement,
    message: 'JSX Opening Element closing escape must be aligned to opening escape',
    fix(fixer) {
      const { start, end } = openingElement.loc!
      const endPoint = openingElement.range![1]
      return fixer.replaceTextRange([endPoint - end.column, endPoint - 2], ''.padEnd(start.column, ' '))
    }
  })
}

function reportFullTagWithoutAttrs(context: Rule.RuleContext, node: Rule.Node, lineBreaks: number) {
  const openingElement: Rule.Node = (node as any).openingElement
  context.report({
    node: openingElement,
    message: `Expect no line break before closing bracket, but ${lineBreaks} line break${lineBreaks > 1 ? 's' : ''} found.`,
    fix(fixer) {
      const tag: string = (openingElement as any).name.name
      return fixer.replaceTextRange([openingElement.range![0], openingElement.range![1]], `<${tag}>`)
    }
  })
}

function reportFullTagInlineAttrs(context: Rule.RuleContext, node: Rule.Node, lineBreaks: number) {
  const openingElement: Rule.Node = (node as any).openingElement
  const { end } = openingElement.loc!
  context.report({
    node: openingElement,
    message: `Expect no line break before closing bracket, but ${lineBreaks} line break${lineBreaks > 1 ? 's' : ''} found.`,
    fix(fixer) {
      const endPoint = openingElement.range![1]
      return fixer.removeRange([endPoint - end.column - lineBreaks, endPoint - 1])
    }
  })
}

function reportFullTagMultilineAttrsLineBreaks(context: Rule.RuleContext, node: Rule.Node, lineBreaks: number) {
  const openingElement: Rule.Node = (node as any).openingElement
  const { start, end } = openingElement.loc!
  context.report({
    node: openingElement,
    message: `Expect no line break before closing bracket, but ${lineBreaks - 1} line break${lineBreaks > 2 ? 's' : ''} found.`,
    fix(fixer) {
      const endPoint = openingElement.range![1]
      return fixer.replaceTextRange([endPoint - end.column - lineBreaks + 1, endPoint - 1], ''.padEnd(start.column, ' '))
    }
  })
}

function reportFullTagMultilineWrongIndent(context: Rule.RuleContext, node: Rule.Node) {
  const openingElement: Rule.Node = (node as any).openingElement
  const { start, end } = openingElement.loc!
  context.report({
    node: openingElement,
    message: 'JSX Opening Element closing escape must be aligned to opening escape.',
    fix(fixer) {
      const endPoint = openingElement.range![1]
      return fixer.replaceTextRange([endPoint - end.column, endPoint - 1], ''.padEnd(start.column, ' '))
    }
  })
}

function reportFullTagChildrenNotInANewLine(context: Rule.RuleContext, node: Rule.Node) {
  const { openingElement, children }: { openingElement: Rule.Node, children: Rule.Node[] } = node as any
  const { start: oStart, end: oEnd } = openingElement.loc!
  const first = children[0]
  context.report({
    node: first,
    message: `Expect a new line after opening element in JSX.`,
    fix(fixer) {
      const oEndPos = openingElement.range![1]
      return fixer.replaceTextRange([oEndPos, oEndPos], '\n' + ' '.repeat(oStart.column + 2))
    }
  })
}

export {
  reportTagOnly,
  reportInlineTagWithAttrs,
  reportMultilineTagWithAttrs,
  reportSelfCloseMultiLineWrongIndent,
  reportFullTagWithoutAttrs,
  reportFullTagInlineAttrs,
  reportFullTagMultilineAttrsLineBreaks,
  reportFullTagMultilineWrongIndent,
  reportFullTagChildrenNotInANewLine,
}