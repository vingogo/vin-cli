module.exports = {
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/extensions': 'off',
    quotes: ['warn', 'single'],
    semi: [0],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'max-len': 'warn',
    'no-restricted-syntax': 'off',
    'no-bitwise': 'off',
    camelcase: 'off',
    'no-case-declarations': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-undef': 'off',
    'no-promise-executor-return': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'linebreak-style': 'off',
    'no-nested-ternary': 'off',
    'no-unused-expressions': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'prefer-promise-reject-errors': 'off',
    'consistent-return': 'off',
    'prefer-destructuring': 'off'
  }
};
