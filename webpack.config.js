/* eslint-disable */
const path = require('path');

module.exports = {
    entry: './src/App',
    mode:'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use:[
                    { loader: 'style-loader' },
                    {loader: 'css-loader'},
                    { loader: 'less-loader' }
                ],
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')],
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    }
};