const config = require('./config/index')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')

module.exports = {
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        mainFields: ['jsnext:main', 'browser', 'main'],
        alias: {
            "@src":path.resolve(config.root, "./app/client/src")
        }
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|js)$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            // {
            //     test: /\.s?css$/,
            //     use: [{
            //         loader: MiniCssExtractPlugin.loader,
            //         options: {
            //           hmr: process.env.NODE_ENV === 'development',
            //         },
            //       }, 'css-loader', 'sass-loader']
            // }
        ]
    },
    plugins: [
        new ModuleConcatenationPlugin(),
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: '[name].css',
        //     chunkFilename: '[id].css',
        // })
    ]
};