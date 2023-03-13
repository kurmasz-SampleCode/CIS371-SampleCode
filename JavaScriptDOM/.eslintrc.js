module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'jest': true
    },
    'extends': 'eslint:recommended',
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-unused-vars': [
            'error', {
                'argsIgnorePattern': '^_',
                'varsIgnorePattern': '^_'
            }
        ],
        'react/prop-types': 0
    }
}
