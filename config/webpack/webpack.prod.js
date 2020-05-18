const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Config directories
const TOP_DIR = '../../';
const SRC_REACT = path.resolve(__dirname, TOP_DIR, 'src-react');
const SRC_ELECTRON = path.resolve(__dirname, TOP_DIR, 'src-electron');
const OUTPUT_DIR = path.resolve(__dirname, TOP_DIR, 'dist');

const mainConfig = {
    mode: 'production',
    target: 'electron-main',
    entry: {
        electron: SRC_ELECTRON + '/index.js',
    },
    output: {
        path: OUTPUT_DIR,
        publicPath: './',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
    ]
};

const rendererConfig = {
    mode: 'production',
    target: 'electron-renderer',
    entry: {
        react: SRC_REACT + '/index.js',
    },
    output: {
        path: OUTPUT_DIR,
        publicPath: './',
        filename: '[name].bundle.js'
    },
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
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            chunks: ['react']
        }),
    ]
};

module.exports = [mainConfig, rendererConfig];