const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpackConfig = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, 'assert'),
    mode: 'development',
    entry: {
        index: './js/index.js'
    },
    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
            '@models': path.resolve(__dirname, 'assert/js/modules'),
            '@style': path.resolve(__dirname, 'assert/scss/'),
        }
    },
    output: {
        filename: "[name].[hash].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].[hash].bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                mangle: {
                    properties: {
                        regex: /(^P1|^p1|^_p1)[A-Z]\w*/
                    }
                },
                sourceMap: false,
                keep_fnames: false,
                toplevel: true,
            }
        })],
        splitChunks: {
            chunks: 'async',
            minSize: 2000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },

                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },

            },
        },
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }
        ]
    }

};