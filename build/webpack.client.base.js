const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(commonConfig, {
   

    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'commons',
            filename: '[name].[chunkhash].js'
        }
    },

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      hmr: process.env.NODE_ENV === 'development',
                    },
                  }, 'css-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[id].css',
        })
    ]
})
