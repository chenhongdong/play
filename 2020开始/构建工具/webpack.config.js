const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// 1.去除无用的样式
const glob = require('glob');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
// console.log(glob.sync(path.resolve(__dirname, 'src/**/*'), {nodir: true}));

// 2.添加CDN
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

// 4.DllPlugin动态链接库
const webpack = require('webpack');

const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    entry: './src/test.js',
    // entry: {
    //     index: './src/index.js',
    //     // lrc: './src/lrc.js',
    //     // audio: './src/audio.js'
    // },
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist'),
        // chunkFilename: '[name]-load.js'
    },
    resolve: {
        modules: [path.resolve('node_modules')],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            Utils: path.resolve(__dirname, 'src/utils')
        }
    },
    module: {
        noParse: /jquery|lodash/,
        rules: [
            {
                test: /\.js$/,
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
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    // 6.提取公共代码
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,
                    priority: 1
                },
                utils: {
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/audio.html',
        //     filename: 'audio.html'
        // }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        // 1.去除无用的样式
        new PurgecssWebpackPlugin({
            paths: glob.sync('./src/**/*', {nodir: true})
        }),
        // 2.添加CDN
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'jquery',
                    entry: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js',
                    global: 'jQuery'
                },
                {
                    module: 'vue',
                    entry: 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
                    global: 'Vue'
                }
            ]
        }),
        // 4.动态链接库
        new webpack.DllReferencePlugin({
            manifest: path.resolve('dll', 'manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve('dll', 'react.dll.js')
        }),
        // 7.支持热更新
        // 支持热更新插件
        // new webpack.HotModuleReplacementPlugin(),
        // // 打印更新了的文件路径
        // new webpack.NamedModulesPlugin(),
        // // 9.IgnorePlugin
        // new webpack.IgnorePlugin(/\.\/locale/, /moment/)

    ],
    // devServer: {
    //     hot: true,  // 7.启动热更新
    //     port: 8080,
    //     contentBase: './dist'
    // }
};



/* 
    1.去除无用的样式
    Usage:
        const glob = require('glob');
        const PurgecssWebpackPlugin = require('purgecssWebpackPlugin');

        module.exports = {
            plugins: [
                new PurgecssWebpackPlugin({
                    paths: glob.sync('./src/**\/*', {nodir: true})
                })
            ]
        }
    2.添加CDN
    Usage:
        const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

        module.exports = {
            plugins: [
                new HtmlWebpackExternalsPlugin({
                    module: 'jquey',
                    entry: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js',
                    global: 'jQuery'
                })
            ]
        }
    3.Tree-shaking
        作用： 在生产模式下，删除掉在import时未用到的模块
        副作用：
            如果export导出的代码有自执行的方法，即使import未引入这个模块也会打包进去
        解决副作用： 
            需要配合package.json文件里添加一个sideEffects的属性，赋值为false就把这些副作用给干掉了不会再打包进去了
        // package.json
        {
            "sideEffects": false
        }
        不过这样写完也会出现一个问题，css样式怎么办
        import './style.css';   // 引用并未使用
        所以还需要修改一下package.json里的sideEffects属性，给它一个去除副作用的范围
        {
            "sideEffects": ["**\/*.css"]
        }
    4.DllPlugin动态链接库
        很多时候我们在开发时无论是用React还是Vue，我们都不希望这个开发的主力框架每次都被打包一遍，这样也是费时费力的事情
        于是乎，出现了DllPlugin这种插件，它纯属webpack内置的，放心大胆的用，
        它的作用就是在第一次打包的时候就把打包用到的开发框架直接打包好，然后会生成一个manifest.json文件。
        之后你再打包的时候，只要有import React from 'react'这样的框架引用，它就会先去所谓的缓存文件里去找，找到了就直接用，也不用再进行对react打包了
        当然，如果没找到的话，再打包一遍也无伤大雅
    5.懒加载
        ES6的import()语法
    6.抽取公共代码
    webpack4中自带了抽取公共代码的方法，通过optimization里的splitChunks来做到
    7.热更新
    devServer的hot属性启动热更新
    8.跨域
    9.IgnorePlugin
    忽略打包指定的第三方模块目录
*/