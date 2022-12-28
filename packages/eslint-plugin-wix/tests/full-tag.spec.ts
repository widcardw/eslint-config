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
  valid: [
    {
      name: 'success',
      code: `
        function SomeComponent() {
          return (
            <div {...props}>
              ...
            </div>
          )
        }`
    },
    {
      name: 'success',
      code: `
        function SomeComponent() {
          return (
            <div style={{ color: 'black' }}>
              ...
            </div>
          )
        }`
    },
    {
      name: 'success',
      code: `
        function SomeComponent() {
          return (
            <div 
              style={{ color: 'black' }}
              style={{ color: 'black' }}
            >
              ...
            </div>
          )
        }`
    },
  ],
  invalid: [
    {
      name: 'JSX opening element tag indent error',
      code: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}
>
              ...
            </div>
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}
            >
              ...
            </div>
          )
        }`,
      errors: [
        { message: 'JSX Opening Element closing escape must be aligned to opening escape' }
      ]
    },
    {
      name: 'JSX element unexpected line breaks, no props',
      code: `
        function SomeComponent() { 
          return (
            <Comp

            >
              ...
            </Comp>
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <Comp>
              ...
            </Comp>
          )
        }`,
      errors: [
        { message: 'Expect no line break before closing bracket, but 2 line breaks found.' }
      ]
    },
    {
      name: 'JSX element unexpected line breaks before closing bracket',
      code: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}

            >
              ...
            </div>
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}
            >
              ...
            </div>
          )
        }`,
      errors: [
        { message: 'Expect no line break before closing bracket, but 1 line break found.' }
      ]
    },
    {
      name: 'JSX element unexpected line breaks before bracket and between attrs',
      code: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}

              onClick={() => {}}

            >
              ...
            </div>
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}

              onClick={() => {}}
            >
              ...
            </div>
          )
        }`,
      errors: [
        { message: 'Expect no line break before closing bracket, but 1 line break found.' }
      ]
    },
    {
      name: 'JSX element unexpected line breaks before closing bracket',
      code: `
        function SomeComponent() { 
          return (
            <div style={{ color: 'black' }}

            >
              ...
            </div>
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <div style={{ color: 'black' }}>
              ...
            </div>
          )
        }`,
      errors: [
        { message: 'Expect no line break before closing bracket, but 2 line breaks found.' }
      ]
    },
    {
      name: 'JSX element unexpected line breaks before closing bracket',
      code: `
        function SomeComponent() { 
          return (
            <div style={{ color: 'black' }}
            >
              ...
            </div>
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <div style={{ color: 'black' }}>
              ...
            </div>
          )
        }`,
      errors: [
        { message: 'Expect no line break before closing bracket, but 1 line break found.' }
      ]
    },
  ]
})