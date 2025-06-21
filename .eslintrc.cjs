module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never' },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    // Правила для FSD
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // Запрещаем импорт из pages в entities, features, shared
          {
            target: './src/entities',
            from: './src/pages',
          },
          {
            target: './src/features',
            from: './src/pages',
          },
          {
            target: './src/shared',
            from: './src/pages',
          },
          // Запрещаем импорт из features в entities, shared
          {
            target: './src/entities',
            from: './src/features',
          },
          {
            target: './src/shared',
            from: './src/features',
          },
          // Запрещаем импорт из entities в shared
          {
            target: './src/shared',
            from: './src/entities',
          },
        ],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: '@shared/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@entities/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@features/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@pages/**',
            group: 'internal',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
