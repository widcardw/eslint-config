import { RuleTester } from 'eslint'
import { rules } from '../src'

const rulerTest = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  }
})

rulerTest.run("Closing bracket indent", rules['closing-tag'], {
  valid: [],
  invalid: [
    {
      name: 'JSX first attr occupies multiple lines',
      code: `
        <div onClick={() => {
          setCounter(p => p + 1)
        }}>
          123
        </div>`,
      output: `
        <div onClick={() => {
          setCounter(p => p + 1)
        }}
        >
          123
        </div>`,
      errors: [
        { message: 'JSX Opening Element closing escape must be aligned to opening escape.' }
      ]
    },
  ],
})