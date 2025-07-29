import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import sonarjs from 'eslint-plugin-sonarjs'
import vitest from 'eslint-plugin-vitest'
import testingLibrary from 'eslint-plugin-testing-library'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      sonarjs.configs.recommended,
      testingLibrary.configs['flat/dom'],
      eslintConfigPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Prevent direct imports from @testing-library/react in test files
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@testing-library/react',
              message:
                'Import from @/test/test-utils instead to use our custom render with providers.',
            },
            {
              name: '@testing-library/user-event',
              message:
                'Import from @/test/test-utils instead - user is already set up in the render function.',
            },
          ],
        },
      ],
      'testing-library/no-node-access': 'off',
      'testing-library/no-container': 'off',
    },
  },
  // Override for test-utils.tsx - allow testing-library imports
  {
    files: ['**/testing/test-utils.tsx'],
    rules: {
      'no-restricted-imports': 'off',
    },
  }
)
