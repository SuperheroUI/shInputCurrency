var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'sh-input-currency': './src/sh-input-currency.js',
    },
    output: {
        path: path.resolve(__dirname, './bin'),
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd'
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        },
        {
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        },
        {
            lodash: {
                root: '_',
                commonjs2: 'lodash',
                commonjs: 'lodash',
                amd: 'lodash'
            }
        }
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.jsx?$/,
                use: [
                    { loader: 'babel-loader' }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(ttf|eot|svg|woff|woff1|woff2)$/,
                use: [
                    { loader: "url-loader" }]
            },
            {
                test: /\.html$/,
                use: [
                    { loader: "file?name=[name].[ext]" }
                ]
            },
        ]
    }
};
