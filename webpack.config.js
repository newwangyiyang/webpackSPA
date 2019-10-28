const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

const path = require('path');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv['mode']

const webpackConfig = require(`./config/webpack.${_mode}.js`)
const merge = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackBaseConfig = {
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                'css-loader'
            ]
        }]
    },
    devServer: {
        port: 3000,
        before(app) {
            app.get('/api/test', (req, res) => {
                res.json({
                    code: 200,
                    msg: '王一扬'
                })
            })
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'initial', // all async initial 是否对异步代码进行的代码分割
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            },
        },      
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new WebpackDeepScopeAnalysisPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: _mode === 'production' ? 'style/[name].[hash:6].css' : 'style/[name].css',
            chunkFilename: _mode === 'production' ? 'style/[id].[hash:6].css' : 'style/[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        new CleanWebpackPlugin(),
    ]
}
const config = merge(webpackBaseConfig, webpackConfig)
module.exports = config