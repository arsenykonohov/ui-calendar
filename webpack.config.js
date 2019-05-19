const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html', }),
        new MiniCssExtractPlugin({}),
    ],
    devServer: {
        contentBase: './dist',
        port: process.env.PORT || 3000,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {},
                    }, {
                        loader: 'sass-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[ext]'
                    },
                }, ],
            },
            {
                test: /src.*\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                        ],
                    },
                }, ],
            },
        ],
    },
};