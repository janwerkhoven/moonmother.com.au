module.exports = {
  root: true,
  globals: {
    ga: true,
    Instafeed: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
    'no-console': 1
  }
};
