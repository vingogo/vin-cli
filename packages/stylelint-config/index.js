module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties'
  ],
  rules: {
    'comment-no-empty': true,
    'no-descending-specificity': null,
    'at-rule-no-unknown': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  }
};
