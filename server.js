const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();

// Serve files statically from /public...
app.use(express.static(__dirname + '/public'));

// ...except bundle.js which is served dynamically using webpack dev middleware.
webpackConfig.mode = "development"
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: {
        colors: true,
    },
}));

const server = app.listen(3000, function() {
    const address = server.address()
    console.log('Listening at http://%s:%s', address.address, address.port);
});
