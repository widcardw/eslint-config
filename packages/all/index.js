module.exports = {
  extends: [
    "@antfu",
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
  },
}