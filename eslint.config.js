import js from '@eslint/js';
import react from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: { react },
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed in modern React
      'no-unused-vars': 'warn'
    }
  },
  eslintConfigPrettier // Disables ESLint rules that conflict with Prettier
];
