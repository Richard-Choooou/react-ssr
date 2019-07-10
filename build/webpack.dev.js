// const baseConfig = require('./webpack.common')
const clientBaseConfig = require('./webpack.client.base')
const serverBaseConfig = require('./webpack.server.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

module.exports = [merge(clientBaseConfig, {
    entry: {
        client: [path.resolve(__dirname, '../app/client/client.entry.tsx'), 'webpack-hot-middleware/client?name=client']
    },
    devtool: "inline-source-map",
    output: {
        publicPath: '/',
        filename: '[name].index.[hash].js',
        path: path.resolve(__dirname, '../app/server/static/dist'),
        hotUpdateChunkFilename: 'hot/[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json'
    },
    mode: "development",
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}), merge(serverBaseConfig, {
    target: 'node',
    entry: {
        server: [path.resolve(__dirname, '../app/client/server.entry.tsx')]
    },
    devtool: "inline-source-map",
    output: {
        publicPath: './',
        filename: '[name].index.js',
        path: path.resolve(__dirname, '../app/dist'),
        libraryTarget: 'commonjs2'
    },
    mode: "development"
})]