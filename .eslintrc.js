module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-namespace': 'off'
  },
  overrides: [
    {
      files: ['src/infra/db/typeorm/models/*.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ]
}
