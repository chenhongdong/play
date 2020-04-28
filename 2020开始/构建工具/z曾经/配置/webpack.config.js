const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// 主要功能查找匹配的文件
const glob = require('glob');
// 删除无意义的css，只能配合mini-css-extract-plugin先抽离出来后再删除无用样式
const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin');


// 不打包CDN加载的文件
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');


// Dll引用插件
const DllReferencePlugin = require('webpack').DllReferencePlugin;

// html添加资源插件
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

// 打包文件分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
    return {
        mode: env,
        // entry有三种写法，字符串，数组，对象
        entry: './src/index.js',
        // entry: {
        //     a: './src/a.js',
        //     b: './src/b.js',
        //     // common: './src/common.js'
        // },
        output: {
            // filename: 'bundle.js',      // 同步打包的名字
            filename: '[name].js',
            // chunkFilename: '[name].min.js',          // 异步打包的名字
            path: path.resolve(__dirname, 'dist')
        },
        // externals: {
        //     'jquery': '$'       // 不去打包代码中的jquery
        // },
        // optimization: {
        //     usedExports: true,      // 告诉我使用了哪个模块
        // },
        // 在生产环境下将第三方模块进行抽离
        optimization: {
            // splitChunks: {
            //     // initital只操作同步的，all是所有的，async默认异步的
            //     chunks: 'initial',    // 默认支持异步的代码分割 import()
            //     minSize: 30000,     // 文件超过30k开始抽离
            //     maxSize: 0,
            //     minChunks: 1,       // 最少模块引用一次就抽离
            //     maxAsyncRequests: 5,    // 最多5个请求
            //     maxInitialRequests: 3,  // 最多首屏加载3个请求<script></script>3个
            //     automaticNameDelimiter: '~',    // common~a~b
            //     automaticNameMaxLength: 30,
            //     name: true,
            //     cacheGroups: {  // 缓存组
            //         vendors: {
            //             test: /[\\/]node_modules[\\/]/,
            //             priority: 1       // 优先级
            //         },
            //         common: {  // common~a~b
            //             minChunks: 1,
            //             minSize: 1,
            //             priority: 2,
            //             reuseExistingChunk: true
            //         }
            //     }
            // }
        },
        module: {
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
                {   // 降低分辨率 清晰度
                    test: /\.(jpe?g|png|gif)$/,
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
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
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        env !== 'development' ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                }
            ]
        },
        plugins: [
            env !== 'development' && new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                // chunks: ['a']       // chunks引入的代码模块
            }),
            // new HtmlWebpackPlugin({
            //     template: './src/index.html',
            //     filename: 'login.html',
            //     chunks: ['b'],
            //     // chunks: ['b', 'common'],      // chunks打包的顺序，可以按照自己排列的顺序加载，默认是从右向左依次加载的
            //     chunksSortMode: 'manual'
            // }),
            new CleanWebpackPlugin(),
            new PurgeCssWebpackPlugin({
                paths: glob.sync('./src/**/*', { nodir: true })
            }),
            // 插入CDN资源
            /* new HtmlWebpackExternalsPlugin({
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
            }), */
            new DllReferencePlugin({
                manifest: path.resolve(__dirname, 'lib/manifest.json')
            }),
            // 把react.dll.js动态加重到index.html中
            new AddAssetHtmlWebpackPlugin({
                filepath: path.resolve(__dirname, 'lib/react.dll.js')
            }),
            // 生产环境下
            // env !== 'development' && new BundleAnalyzerPlugin()
        ].filter(Boolean),
        resolve: {
            modules: [path.resolve('node_modules')],    // 指定解析第三方包的目录
            alias: {    // 别名
                Utils: path.resolve(__dirname, 'src/utils/')
            },
            extensions: ['.js', '.css', '.json']    // 省略扩展名
        },
        devServer: {    // devServer内部就是express实现的
            // 第一种方法 代理
            // proxy: {    // 重写的方式，把请求代理到后端服务器上
            //     // '/api': 'http://localhost:9000'     // 配置了一个代理
            //     '/api': {
            //         target: 'http://localhost:9000',
            //         pathRewrite: {
            //             '/api': ''  // 把/api替换为空，这样就访问的是9000/user接口了
            //         }
            //     }
            // }

            // 第二种方法，前端自己模拟数据
            before(app) {
                app.get('/user', (req, res) => {
                    res.json({name: '天下足球'});
                });
            }
        }
    }
};