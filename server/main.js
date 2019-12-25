const express = require("express")
const path = require('path')
const webpack = require('webpack')
const server = express();

const webpackConfig = require("../webpack/webpack.dev.js")
const compiler = webpack(webpackConfig)

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, compiler.devServer)
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)
const staticPath = express.static(path.resolve(__dirname, "../public"))
server.use(staticPath)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`sarver is runnig on port ${PORT}`)
})