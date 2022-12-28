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
        const OneSection = ({ title, description }) => {
          return (
            <Card title={title} content={description} />
          )
        }`
    },
    {
      name: 'success',
      code: `
        function SomeComponent() {
          return (
            <Card
              title={title}
            />
          )
        }`
    },
    {
      name: 'success',
      code: `
        function SomeComponent() {
          return (
            <Card
              title={title}
              description={description}
            />
          )
        }`
    }
  ],
  invalid: [
    {
      name: 'JSX element unexpected line breaks before self-closing bracket (with attrs)',
      code: `
        function SomeComponent() { 
          return (
            <div style={{ color: 'black' }}

            />
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <div style={{ color: 'black' }} />
          )
        }`,
      errors: [
        { message: 'Expect no line break before closing bracket, but 2 line breaks found.' }
      ]
    },
    {
      name: 'JSX element unexpected line breaks before self-closing bracket (with attrs)',
      code: `
        function SomeComponent() { 
          return (
            <div style={{ color: 'black' }}
            />
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <div style={{ color: 'black' }} />
          )
        }`,
      errors: [
        { message: 'Expect no line break before closing bracket, but 1 line break found.' }
      ]
    },
    {
      name: 'JSX element unexpected line breaks before self-closing bracket (no attrs)',
      code: `
        function SomeComponent() { 
          return (
            <div

            />
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <div />
          )
        }`,
      errors: [
        { message: 'Expect no line break before closing bracket, but 2 line breaks found.' }
      ]
    },
    {
      name: 'JSX element unexpected line breaks before self-closing bracket (multiline attrs)',
      code: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}
              style={{ color: 'black' }}


      />
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}
              style={{ color: 'black' }}
            />
          )
        }`,
      errors: [
        { message: 'Expect no line break before closing bracket, but 2 line breaks found.' },
        { message: 'JSX Opening Element closing escape must be aligned to opening escape' },
      ]
    },
    {
      name: 'JSX element wrong indent before self-closing bracket (multiline attrs)',
      code: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}
              style={{ color: 'black' }}
      />
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}
              style={{ color: 'black' }}
            />
          )
        }`,
      errors: [
        { message: 'JSX Opening Element closing escape must be aligned to opening escape' }
      ]
    },
    {
      name: 'JSX element unexpected line breaks before self-closing bracket (multiline attrs)',
      code: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}
              style={{ color: 'black' }}

            />
          )
        }`,
      output: `
        function SomeComponent() { 
          return (
            <div
              style={{ color: 'black' }}
              style={{ color: 'black' }}
            />
          )
        }`,
      errors: [
        { message: 'Expect no line break before closing bracket, but 1 line break found.' }
      ]
    },
  ]
})