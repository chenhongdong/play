const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const Happypack = require('happypack');

module.exports = {
    entry: {
        a: './src/a.js',
        // b: './src/b.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        hot: true,  // 启用热更新
        port: 8080,
        // compress: true,     //启用gzip压缩
        contentBase: './build'
    },
    // optimization: {
    //     splitChunks: {  // 分割代码块
    //         cacheGroups: {  // 缓存组
    //             common: {   // 公共模块
    //                 chunks: 'initial',
    //                 minSize: 0,
    //                 minChunks: 2,
    //             },
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: 'initial',
    //                 minSize: 0,
    //                 minChunks: 2,
    //                 priority: 1     // 优先级高的先抽离
    //             }
    //         }
    //     }
    // },
    module: {
        noParse: /jquery/,  // 不去解析jquery中的依赖库
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve('src'),
                // use: 'Happypack/loader?id=js'
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                // use: 'Happypack/loader?id=css'
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // 打印更新的模块路径
        new webpack.NamedModulesPlugin(),
        // 支持热更新插件
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 忽略引入moment里的locale语言包
        // new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        // happypack
        // new Happypack({
        //     id: 'js',
        //     use: [
        //         {
        //             loader: 'babel-loader',
        //             options: {
        //                 presets: [
        //                     '@babel/preset-env',
        //                     '@babel/preset-react'
        //                 ]
        //             }
        //         }
        //     ]
        // }),
        // new Happypack({
        //     id: 'css',
        //     use: ['style-loader', 'css-loader']
        // })

    ]
}