const express = require("express");
const path = require('path');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const passport = require('passport');
const server = express();
const users = require('./routes/users');
const tasks = require('./routes/tasks');
const handbooks = require('./routes/handbooks');
const webpackConfig = require("../webpack/webpack.dev.js")
const compiler = webpack(webpackConfig)

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, compiler.devServer)
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)


server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());


const staticPath = express.static(path.resolve(__dirname, "../public"))
server.use(staticPath)


//passport middleware
server.use(passport.initialize());


//passport config
require('./config/passport')(passport);

//Routes
server.use('/api/users', users);
server.use('/api/tasks', tasks);
server.use('/api/handbooks', handbooks);

server.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'../public/index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`sarver is runnig on port ${PORT}`)
})