import { Rule } from 'eslint'
import { reportFullTagChildrenNotInANewLine, reportFullTagInlineAttrs, reportFullTagMultilineAttrsLineBreaks, reportFullTagMultilineWrongIndent, reportFullTagOpeningEndSymbolShouldBeInANewLine, reportFullTagWithoutAttrs, reportInlineTagWithAttrs, reportMultilineTagWithAttrs, reportSelfCloseMultiLineWrongIndent, reportTagOnly } from './reports'

export const closingTag: Rule.RuleModule = {
  meta: {
    fixable: 'code'
  },
  create(context) {
    return {
      JSXElement(node: Rule.Node) {
        const { openingElement, closingElement }: { openingElement: Rule.Node, closingElement: Rule.Node, children: Rule.Node[] } = node as any

        /**
         * No closing element, that is, self-closing tag
         */
        if (closingElement === null) {
          const { start, end } = openingElement.loc!
          const jsxAttributes: Array<Rule.Node> | undefined = (openingElement as any).attributes
          const lineBreaks = end.line - start.line
          if (typeof jsxAttributes === 'undefined' || jsxAttributes.length === 0) {
            if (lineBreaks >= 1)
              reportTagOnly(context, node, lineBreaks)
            /**
             * <div             <div />
             *           -->
             * />
             */
          }
          else {
            const locLastAttr = jsxAttributes[jsxAttributes.length - 1].loc!
            const lineBreaks3 = end.line - locLastAttr.end.line
            if (locLastAttr.end.line === start.line && lineBreaks3 >= 1)
              reportInlineTagWithAttrs(context, node, lineBreaks3)
            /**
             * <div style={{ color: 'black' }} link={link}        <div style={{ color: 'black' }} link={link} />
             * />                                            -->
             */

            else if (lineBreaks3 > 1)
              reportMultilineTagWithAttrs(context, node, lineBreaks3)
            /**
             * <div                                   <div
             *   style={{ color: 'black' }}    -->      style={{ color: 'black' }}
             *   link={link}                            link={link}
             *                                        />
             * />
             */

            if (locLastAttr.end.line !== start.line && lineBreaks3 >= 1 && end.column - start.column !== 2)
              reportSelfCloseMultiLineWrongIndent(context, node)
            /**
             * <div                                   <div
             *   style={{ color: 'black' }}    -->      style={{ color: 'black' }}
             *   link={link}                            link={link}
             *       />                               />
             */
          }
          return
        }

        /**
         * full closing tag
         */
        const { start: oStart, end: oEnd } = openingElement.loc!
        const { start: eStart } = closingElement.loc!
        const jsxAttributes: Array<Rule.Node> | undefined = (openingElement as any).attributes
        const lineBreaks = oEnd.line - oStart.line

        /**
         * <div><child />             <div>
         * </div>            -->        <child />
         *                            </div>
         */
        if (eStart.line > oEnd.line) {
          const children: Rule.Node[] = (node as any).children
          if (children && children.length > 0) {
            const first = children[0]
            // console.warn('first content', first)
            const flag = (
              ((first as any).type === 'JSXElement') ||
              ((first as any).type === 'JSXExpressionContainer') ||
              (
                (first as any).type === 'JSXText' && 
                !((first as any).raw as string).replace(/^[ ]+/, '').startsWith('\n')
              )
            )
            if (flag)
              reportFullTagChildrenNotInANewLine(context, node)
          }
        }

        /**
         * No attributes
         */
        if (typeof jsxAttributes === 'undefined' || jsxAttributes.length === 0) {
          if (lineBreaks >= 1)
            reportFullTagWithoutAttrs(context, node, lineBreaks)
          /**
           * <div                 <div>
           *                -->     ...
           * > ... </div>         </div>
           */
        }

        /**
         * With attributes
         */
        else {
          const locLastAttr = jsxAttributes[jsxAttributes.length - 1].loc!
          const lineBreaks3 = oEnd.line - locLastAttr.end.line
          if (lineBreaks3 >= 1 && oStart.line === locLastAttr.end.line)
            reportFullTagInlineAttrs(context, node, lineBreaks3)
          /**
           * <div style={{ color: 'black' }}        <div style={{ color: 'black' }}>
           * >                                -->     ...
           *   ...                                  </div>
           * </div>
           */

          else if (lineBreaks3 > 1)
            reportFullTagMultilineAttrsLineBreaks(context, node, lineBreaks3)
          /**
           *  <div                                <div
           *    style={{ color: 'black' }}          style={{ color: 'black' }}
           *                                      >
           *  >                             -->     ...
           *    ...                               </div>
           *  </div>
           */

          // Here!!
          if (locLastAttr.end.line === oEnd.line && locLastAttr.end.line !== oStart.line && lineBreaks >= 1)
            reportFullTagOpeningEndSymbolShouldBeInANewLine(context, node)

          else if (locLastAttr.end.line !== oStart.line && lineBreaks >= 1 && oEnd.column - oStart.column !== 1)
            reportFullTagMultilineWrongIndent(context, node)
          /**
           *  <div                              <div
           *    style={{ color: 'red' }}          style={{ color: 'red' }}
           *        >                      -->  >
           *    ...                               ...
           *  </div>                            </div>
           */
        }
      }
    }
  }
}
