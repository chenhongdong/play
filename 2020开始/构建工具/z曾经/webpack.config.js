const path = require('path');
// 绑定html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理打包目录
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
// 抽离CSS样式以link形式导入
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 1.删除无用的样式
const glob = require('glob');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');


// 3.动态添加CDN
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

// 6.动态链接库和引用
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

// 10.Happypack多进程打包
const Happypack = require('happypack');

// 11.打包分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // entry: './src/index.js',
    entry: {
        index: './src/index.js',
        // audio: './src/audio.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist'),
        // chunkFilename: 'hello'
    },
    // 7.resolve解析
    resolve: {
        modules: ['node_modules'],  // 指定第三方模块搜索的目录
        alias: {    // 别名
            utils: path.resolve('src', 'utils')
        },  // 省略扩展名
        extensions: ['.js', '.css', 'json']
    },
    // 8.splitChunks抽离公共方法
    /* optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,
                    priority: 1
                }
            }
        }
    }, */
    module: {
        noParse: /jquery|lodash/,   // 5.noParse 不把jquery或lodash依赖的包打包进去
        rules: [
            {
                test: /\.js$/,
                // use: 'Happypack/loader?id=js'
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                // use: 'Happypack/loader?id=css'
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            publicPath: 'images'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true, // webpack@2.x and newer
                            mozjpeg: {
                                progressive: true,
                                quality: 25
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/audio.html',
        //     filename: 'audio.html',
        //     chunks: ['audio']
        // }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // filename: '[name].css',
            // chunkFilename: '[id].css'
        }),
        new PurgecssWebpackPlugin({
            // 查询src下的所有目录下的任意文件（不含文件夹）
            paths: glob.sync('./src/**/*', { nodir: true })
        }),
        // 添加CDN
        /* new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'jquery',
                    entry: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js',
                    global: 'jQuery'
                }
            ]
        }) */
        // 引用动态链接库
        // new webpack.DllReferencePlugin({
        //     manifest: path.resolve('dll', 'manifest.json')
        // }),
        // 把动态链接库打包出来的文件绑定到html上
        // new AddAssetHtmlWebpackPlugin({
        //     filepath: path.resolve('dll', 'react.dll.js')
        // })
        // 
        new webpack.NamedModulesPlugin(),
        // 9. 支持热更新
        new webpack.HotModuleReplacementPlugin(),
        // 10
        /* new Happypack({
            id: 'js',
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            ]
        }),
        new Happypack({
            id: 'css',
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }), */
        // 11
        // new BundleAnalyzerPlugin()
        // 12. IgnorePlugin忽略打包第三方插件指定的目录
        new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    ],
    devServer: {
        hot: true,  // 启用热更新
        contentBase: './dist',
        // 跨域1
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

        // 跨域2
        // before(app) {
        //     app.get('/api/info', (req, res) => {
        //         res.json({
        //             nickname: '我滴个大榴莲啊',
        //             level: 8,
        //             src: 'https://music.163.com/song/media/outer/url?id=1382794914.mp3'
        //         });
        //     });
        // }
    }
}