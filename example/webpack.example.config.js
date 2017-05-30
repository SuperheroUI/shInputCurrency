var path = require('path');

module.exports = {
    entry: './example/app.js',
    output: {
        path: path.resolve(__dirname, './bin'),
        filename: 'example.js',
    },
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
