const baseConfig = require('./webpack.client.base')
const merge = require('webpack-merge')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: path.resolve(__dirname, '../app/client/client.entry.tsx'),
    output: {
        publicPath: '/dist/',
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../app/server/static/dist'),
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(config.root, './app/server/dist/index.ejs'),
            template: path.resolve(config.root, './public/index.ejs'),
            templateParameters: false
        }),

        new CleanWebpackPlugin()
        // new BundleAnalyzerPlugin()
    ]
})