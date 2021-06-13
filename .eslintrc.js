module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'no-console': 'off',
        'import/no-unresolved': 'off',
        'import/no-self-import': 'error',
        'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
        'import/prefer-default-export': 'off',
        'react/destructuring-assignment': 'off',
        "react/jsx-filename-extension": 'off',
        "import/extensions": "off",
        'react/prop-types': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-props-no-spreading': 0,
        "object-shorthand": 'off'
    },
}
