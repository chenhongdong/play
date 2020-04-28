const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['react', 'react-dom'],
    output: {
        filename: 'react.dll.js',
        path: path.resolve(__dirname, 'dll'),
        library: 'react'
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'react',
            path: path.resolve('dll', 'manifest.json')
        })
    ]
};