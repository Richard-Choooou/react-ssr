const baseConfig = require('./webpack.server.base')
const merge = require('webpack-merge')
const path = require('path')

module.exports = merge(baseConfig, {
    target: "node",
    mode: 'production',
    entry: path.resolve(__dirname, '../app/client/server.entry.tsx'),
    output: {
        publicPath: './',
        filename: 'server.entry.js',
        path: path.resolve(__dirname, '../app/server/dist'),
        libraryTarget: "commonjs2"
    }
})