const path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: [
        './main.js',
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
        ],
    },
    resolve: {
        // Resolve both .js and .jsx files
        extensions: ['.js', '.jsx'],
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    },
};
