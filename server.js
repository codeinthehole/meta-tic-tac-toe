const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();


// Serve bundle.js dynamically.
webpackConfig.mode = "development"
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
    },
}));

// Serve files statically from /public
app.use(express.static(__dirname + '/public'));

const server = app.listen(3000, function() {
    const address = server.address()
    console.log('Listening at http://%s:%s', address.address, address.port);
});
