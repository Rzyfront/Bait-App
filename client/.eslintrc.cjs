module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard'
  ],
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        camelcase: ['error', { properties: 'never' }],
        'no-case-declarations': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/prop-types': 'off',
    semi: ['error', 'always'],
    camelcase: ['error', { properties: 'always', ignoreDestructuring: true }]
  }
};
