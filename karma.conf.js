var path = require('path');
var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true,
        frameworks: ['jasmine'],
        files: ['src/**/*.spec.js'],
        preprocessors: {
            'src/**/*.spec.js': ['webpack']
        },
        reporters: ['dots', 'coverage'],
        coverageReporter: {
            dir: 'bin/coverage/',

            reporters: [
                { type: 'text-summary' },
                { type: 'lcov', subdir: 'lcov' }
            ]
        },
        webpack: {
            node: {
                fs: 'empty'
            }, entry: {
                'sh-input-currency': './src/sh-input-currency.js',
            },

            // Instrument code that isn't test or vendor code.
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
        },
        webpackMiddleware: {
            noInfo: true //please don't spam the console when running in karma!
        }
    });
};
