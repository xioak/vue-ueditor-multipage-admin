module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        'indent': ['warn', 4],
        'semi': 0,  // off semi
        'eol-last': 0,
        'no-unused-vars': 0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        'no-unused-vars': 0,
        'no-console': 'off',
        "linebreak-style": "off",
        "no-multi-spaces": 0,//不能用多余的空格
        "comma-spacing": 0,//逗号前后的空格
         "curly": "error",
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
