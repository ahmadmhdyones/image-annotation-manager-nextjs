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
    plugins: [],
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      // TODO: Add rules
    },
  }),
];

export default eslintConfig;
