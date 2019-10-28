const { resolve } = require('path')
module.exports = {
    output: {
        publicPath: './',
        filename: 'scripts/js/[name].[hash:6].bundles.js',
        path: resolve(__dirname, '../dist')
    }
}