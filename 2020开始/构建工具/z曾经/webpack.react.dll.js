const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['react', 'react-dom'],
    output: {
        filename: 'react.dll.js',
        path: path.resolve('dll'),
        library: 'react_dll',
        // libraryTarget: 'commonjs2'   // 默认是var
    },
    plugins: [
        new webpack.DllPlugin({ // name和library要相同
            path: path.resolve('dll', 'manifest.json'),
            name: 'react_dll'
        })
    ]
}