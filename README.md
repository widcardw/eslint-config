# ESLint config

ESLint config preset based on @antfu/eslint-config.

Recently I am trying vue-tsx and solid-js, so this preset includes some jsx presets.

## Usage

### Install

```sh
pnpm i -D eslint @widcardw/eslint-config
```

### Config `.eslintrc`

```json
{
  "extends": "@widcardw"
}
```

### Config VSCode auto fix

File `.vscode/setting.json`

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Rules

### JSX Opening Element

The `eslint-plugin-wix` will try to fix the indent of some JSX elements. See the examples below or refer to the [tests](packages/eslint-plugin-wix/tests). If you come to any bug, please report it on issues.

_Incorrect_

```jsx
<div style={{ color: 'red' }}
>
  ...
</div>
```

**Correct**

```jsx
<div style={{ color: 'red' }}>
  ...
</div>
```

_Incorrect_

```jsx
<div

/>
```
**Correct**

```jsx
<div />
```

_Incorrect_

```jsx
<div
  style={{ color: 'red' }}>
  ...
</div>
```

**Correct**

```jsx
<div
  style={{ color: 'red' }}
>
  ...
</div>
```

_Incorrect_

```jsx
  ...
    <div
      style={{ color: 'red' }}
      onClick={() => {console.log('You clicked me!')}}

>  {/* <-- This really drives me mad! */}
      ...
    </div>
  ...
```

**Correct**

```jsx
  ...
    <div
      style={{ color: 'red' }}
      onClick={() => {console.log('You clicked me!')}}
    >  {/* <-- Now it is fixed! */}
      ...
    </div>
  ...
```
