/** @format */

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:vue/essential',
        '@vue/prettier',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier/@typescript-eslint',
    ],
    plugins: ['@typescript-eslint'],
    env: {
        browser: true,
        node: true,
    },
}
