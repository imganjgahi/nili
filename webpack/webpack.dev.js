
const webpack = require("webpack")
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode: "development",
    entry: {main: ['webpack-hot-middleware/client?reload=true','./src/index.tsx']},
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../public'),
        publicPath: ""
    },
    devServer: {
        contentBase: "../public",
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    { loader: "babel-loader" }
                ],
                exclude: /node_modules/

            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    { loader: "awesome-typescript-loader" }
                ],
                exclude: /node_modules/

            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]

            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ]

}