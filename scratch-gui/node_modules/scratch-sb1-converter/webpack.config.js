const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devServer: {
        contentBase: false,
        host: '0.0.0.0',
        port: process.env.PORT || 8093
    },
    entry: {
        main: './index.js',
        view: './src/playground/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'playground'),
        libraryTarget: 'commonjs2'
    },
    externals: ['text-encoding'],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
            query: {
                presets: [['@babel/preset-env', {targets: {browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']}}]]
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/playground/index.html',
            chunks: ['view']
        })
    ]
};
