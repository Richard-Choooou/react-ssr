const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const nodeExternals = require('webpack-node-externals')

module.exports = merge(commonConfig, {
    externals: [nodeExternals()],
    module: {
        rules: [
            {test: /\.s?css$/, use: ['ignore-loader']}
        ]
    }
})
