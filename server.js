const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();

// Serve files statically from /public...
app.use(express.static(__dirname + '/public'));

// ...except bundle.js which is served dynamically using webpack dev middleware.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

const server = app.listen(3000, function() {
    const address = server.address()
    console.log('Listening at http://%s:%s', address.address, address.port);
});
