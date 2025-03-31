import recommended from '@marviuz/eslint-config/recommended';
import typescript from '@marviuz/eslint-config/typescript';
import react from '@marviuz/eslint-config/react';


/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['*.config.mjs', '*.config.mjs'] },
  ...recommended,
  ...typescript,
  ...react,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    // files: ['**/*.config.*'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];