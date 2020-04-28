const path = require('path');
const DLLPlugin = require('webpack').DllPlugin;

// 需要产生一个缓存列表
module.exports = {
    mode: 'development',
    entry: ['react', 'react-dom'],
    output: {
        filename: 'react.dll.js',
        library: 'react',
        path: path.resolve(__dirname, 'lib')
    },
    plugins: [
        new DLLPlugin({
            name: 'react',
            path: path.resolve(__dirname, 'lib/manifest.json')
        })
    ]
};