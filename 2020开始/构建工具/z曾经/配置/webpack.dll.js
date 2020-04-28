const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/calc.js',      // add minus
    output: {
        filename: 'calc.js',
        library: 'calc',    // 给打包输出的文件内容声明一个calc的变量名
        libraryTarget: 'commonjs2',       // 默认是var模式
        path: path.resolve(__dirname, 'dll')
    }
}



// 目前是为了将calc打包成node可以使用的模块
// dll可以用作生产环境

// library: 'calc'
// libraryTarget: 'commonjs'
// exports["calc"] = (function(modules){})()


// libraryTarget: 'commonjs2'
// module.exports = (function(modules){})()

// 我本地使用了import React语法，需要先去minifest.json里查找，找到后会加重对应的库的名字，可能会引用某个模块，会去dll.js文件中查找

// Dll的功能是在开发之前，先抽离好打包完，以后就不用打包了