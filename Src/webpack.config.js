var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './index.jsx',
    resolve: { extensions: ['.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'rme.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components|public\/)/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: require.resolve('file-loader'),
                options: {
                    name: '[path][name].[ext]',
                    context: 'assets'
                }
            },
            {
                test: /\.(woff|woff2)$/,
                exclude: /(node_modules|bower_components)/,
                loader: require.resolve('file-loader'),
                options: {
                    name: '[path][name].[ext]',
                    context: 'assets'
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: require.resolve('file-loader'),
                options: {
                    name: '[path][name].[ext]',
                    context: 'assets'
                }
            },
            {
                test: [/\.svg$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('file-loader'),
                options: {
                    limit: 10000,
                    name: 'images/[path][name].[ext]',
                    context: 'assets/images'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'rme.css'
        }),
    ]
}