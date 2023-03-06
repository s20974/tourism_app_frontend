module.exports = { 
  env: { 
    browser: true, 
    es2021: true, 
    node: true, 
  }, 
  plugins: [ 
    '@typescript-eslint', 
    'simple-import-sort', 
    'unused-imports', 
  ], 
  extends: [ 
    'eslint:recommended', 
    'next', 
    'next/core-web-vitals', 
    'plugin:@typescript-eslint/recommended', 
    'prettier', 
  ], 
  rules: { 
    "no-use-before-define": "off", 
    "@typescript-eslint/no-use-before-define": ["error"], 
    "no-unused-vars": "off", 
    "@typescript-eslint/no-unused-vars": ["error"], 
    '@typescript-eslint/explicit-module-boundary-types': 'off', 
    '@typescript-eslint/no-explicit-any': 'off', 
    '@typescript-eslint/no-var-requires': 'off', 
    'react/display-name': 'off', 
    
    'unused-imports/no-unused-imports': 'warn', 
    'unused-imports/no-unused-vars': [ 
      'warn', 
      { 
        vars: 'all', 
        varsIgnorePattern: '^_', 
        args: 'after-used', 
        argsIgnorePattern: '^_', 
      }, 
    ], 
    'simple-import-sort/exports': 'warn', 
    'simple-import-sort/imports': [ 
      'warn', 
      { 
        groups: [ 
          ['^@?\\w', '^\\u0000'], 
          ['^.+\\.s?csxs$'], 
          ['^@/lib', '^@/hooks', '^@/utils'], 
          ['^@/data'], 
          ['^@/components', '^@/container', '^@/stories'], 
          ['^@/store'], 
          ['^@/'], 
          [ 
            '^\\./?$', 
            '^\\.(?!/?$)', 
            '^\\.\\./?$', 
            '^\\.\\.(?!/?$)', 
            '^\\.\\./\\.\\./?$', 
            '^\\.\\./\\.\\.(?!/?$)', 
            '^\\.\\./\\.\\./\\.\\./?$', 
            '^\\.\\./\\.\\./\\.\\.(?!/?$)', 
          ], 
          ['^@/types'], 
          ['^'], 
        ], 
      }, 
    ], 
  }, 
  globals: { 
    React: true, 
    JSX: true, 
  }, 
};