const express = require("express");
const path = require('path');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const passport = require('passport');
const server = express();

//ROUTES PATH
const users = require('./routes/users');
const products = require('./routes/products');
const panel = require('./routes/panel');
const categories = require('./routes/categories');

//Configs
const webpackConfig = require("../webpack/webpack.dev.js");
const sequelize = require("./db/mysqlDatabase");
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
server.use('/api/products', products);
server.use('/api/panel', passport.authenticate('jwt', {session: false}),  panel);
server.use('/api/categories', categories);

server.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'../public/index.html'));
});

const PORT = process.env.PORT || 5000;

// sequelize.sync({force: true}).then((result) => {
sequelize.sync().then((result) => {
    // console.log("result: ", result)
    server.listen(PORT, () => {
        console.log(`sarver is runnig on port ${PORT}`)
    })
}).catch(error => console.log(error));
