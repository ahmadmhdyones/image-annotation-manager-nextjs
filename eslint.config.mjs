/* eslint-disable perfectionist/sort-objects */
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    ignorePatterns: [],
    plugins: ['perfectionist', 'unused-imports'],
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      // General JavaScript Rules
      'no-alert': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-destructuring': ['error', { object: true, array: false }],
      'no-unused-vars': 'off',
      'no-param-reassign': 'warn',
      'no-underscore-dangle': 'off',
      'no-restricted-exports': 'off',
      'no-promise-executor-return': 'warn',

      // React Specific Rules
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
      'react/no-children-prop': 'warn',
      'react/no-array-index-key': 'warn',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'warn',

      // TypeScript Specific Rules
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
      '@typescript-eslint/no-empty-object-type': 'off',

      // Import/Export Rules
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.js',
            '**/*.test.ts',
            '**/*.spec.js',
            '**/*.config.ts',
            '**/*.config.js',
            '**/eslint.config.mjs',
          ],
        },
      ],
      'import/no-cycle': 'error',
      'import/prefer-default-export': 'off',

      // Accessibility Rules
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/control-has-associated-label': 'warn',

      // unused-imports: https://www.npmjs.com/package/eslint-plugin-unused-imports
      'unused-imports/no-unused-imports': 1,
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Perfectionist: https://perfectionist.dev/rules
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'line-length',
          order: 'asc',
          groups: [
            ['builtin', 'external'],
            'custom-mui',
            'custom-hooks',
            'custom-components',
            'custom-types',
            'custom-configs',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              'custom-mui': '^@mui/.*',
              'custom-hooks': '^@/hooks/.*',
              'custom-components': '^@/components/.*',
              'custom-types': '^@/types/.*',
              'custom-configs': '^@/configs/.*',
            },
          },
          newlinesBetween: 'always',
          internalPattern: ['^@/.*'],
        },
      ],
      'perfectionist/sort-exports': ['error', { type: 'line-length', order: 'asc' }],
      'perfectionist/sort-named-imports': ['error', { type: 'line-length', order: 'asc' }],
      'perfectionist/sort-named-exports': ['error', { type: 'line-length', order: 'asc' }],
      'perfectionist/sort-objects': ['error', { type: 'alphabetical', order: 'asc' }],
      'perfectionist/sort-jsx-props': ['error', { type: 'alphabetical', order: 'asc' }],
      'perfectionist/sort-heritage-clauses': ['error', { type: 'alphabetical', order: 'asc' }],
      'perfectionist/sort-intersection-types': ['error', { type: 'alphabetical', order: 'asc' }],
    },
  }),
];

export default eslintConfig;
