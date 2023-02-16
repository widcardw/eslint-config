module.exports = {
  extends: [
    "@antfu/eslint-config-ts",
    "@widcardw/eslint-config-jsx",
  ],
  plugins: [
    "antfu",
    "wix",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'wix/closing-tag': 2,
    '@typescript-eslint/no-unused-vars': 'off',
  },
}