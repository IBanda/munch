module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['.eslintrc.js', 'babel.config.js', 'dist'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
