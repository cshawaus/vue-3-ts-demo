module.exports = {
  root: true,

  extends: [
    'plugin:vue/essential',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/typescript',
  ],

  plugins: [
    '@typescript-eslint',
  ],

  env: {
    node    : true,
    builtin : true,
    es6     : true,
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    extraFileExtensions : ['.vue'],
    parser              : '@typescript-eslint/parser',
    project             : './tsconfig.json',
    sourceType          : 'module',
  },

  rules: {},
}