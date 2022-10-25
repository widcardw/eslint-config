# ESLint config

ESLint config preset based on @antfu/eslint-config.

Recently I am trying vue-tsx, so this preset includes some jsx presets.

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

