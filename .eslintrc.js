module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: ['ember', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended'
  ],
  env: {
    browser: true,
    node: true
  },
  globals: {
    ga: true,
    Instafeed: true,
    anime: true
  },
  rules: {
    'prettier/prettier': 'error',
    'no-debugger': 'warn',
    'no-console': 'warn'
  },
  overrides: [
    // node files
    {
      files: [
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
