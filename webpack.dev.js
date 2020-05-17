const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src-react');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'development',
    entry: SRC_DIR + '/index.js',
    output: {
        path: OUTPUT_DIR,
        publicPath: './',
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    watch: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body'
        }),
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
};