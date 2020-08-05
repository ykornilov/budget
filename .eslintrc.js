module.exports = {
    env: {
        node: true,
        es2020: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
        'prettier/standard',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            impliedStrict: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'jest'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {},
    overrides: [
        {
            files: ['frontend/**/*.js'],
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': ['off'],
            },
        },
        {
            files: ['frontend/**/*.{ts,tsx}'],
            env: {
                browser: true,
            },
            rules: {},
        },
        {
            files: ['*/**/*.spec.{js,ts,tsx}'],
            env: {
                jest: true,
            },
        },
    ],
};
