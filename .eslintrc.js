module.exports = {
  'ignorePatterns': ['/*.js', '/**/*.less', 'node_modules', 'build'],
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'indent': [
      'error',
      4,
      { 'SwitchCase': 1 }
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-case-declarations': 'off',
    'react/prop-types': 'off',
    'max-len': [
      'error',
      160
    ],
    'space-infix-ops': ['error', { 'int32Hint': false }],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'arrow-spacing': [
      'error',
      { "before": true, "after": true }
    ],
    'one-var': [
      'error',
      'consecutive'
    ],
    'require-jsdoc': 'off'
  }
};
