/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: [
    '@typescript-eslint',
    'import',
    'import-helpers',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // 💡 Regras padrão do seu projeto
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // 🚫 Bloqueia imports absolutos tipo "src/..."
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['src/*'],
            message: 'Avoid using absolute imports (src/...). Use relative paths instead.',
          },
        ],
      },
    ],

    // 🚫 Bloqueia imports absolutos do Node tipo "/utils/..."
    'import/no-absolute-path': 'error',

    // 📦 Organiza imports em grupos e corrige automaticamente
    'import-helpers/order-imports': [
      'warn',
      {
        groups: [
          'module',
          '/^@nestjs/',
          '/^@/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
