

const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode: "development",
    entry: './src/index.tsx',
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
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ]

}