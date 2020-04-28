## webpack各种优化
1. 删除无用的css样式

需要安装purgecss-webpack-plugin和glob插件
```
// npm i purgecss-webpack-plugin glob

const glob = require('glob');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');

module.exports = {
    plugins: [
        new PurgecssWebpackPlugin({
            paths: glob.sync('./src/**/*', {nodir: true})   // nodir不包含文件夹 **表示任意目录 *表示任意文件
        })
    ]
}

```
2. CDN加载文件

在html文件中引入cdn文件， 在webpack.config配置externals，这样就不会打包引入的cdn的库
```
// index.html文件

<body>
    <div id="root"></div>
    <!-- 引入jquery的cdn -->
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
</body>
```
```
// webpack.config.js文件
module.exports = {
    externals: {
        'jquery': '$'
    }   
}
```
对应插件为html-webpack-externals-plugin,这个插件可以动态的给页面上添加cdn文件
```
// webpack.config.js文件

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
    plugins: [
        // 动态添加cdn文件到页面中
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
        })
    ]
}
```
3. Tree-shaking和Scope-Hoisting


生产环境下，Tree-shaking会进行自动删除的操作，如果通过ES6的import引用的方式就会把没有用到的代码给删除掉，那么就在打包的时候不会打包其他未引用的方法到bundle.js中去

而且要是引用了模块，却没有使用的话，也可以通过在package.json中配置sideEffects: false，这样就不会打包那些没有使用的模块了。

不过要是直接引用css样式的话直接写sideEffects:false会直接把引入的样式给干掉了，所以修改sideEffects: ["**/*.css"]，排除css文件

4. DllPlugin和DllReferencePlugin

动态链接库DllPlugin

引用动态链接库DllReferencePlugin

5. 动态加载(懒加载)

import()

6. 打包文件分析工具

npm i webpack-bundle-analyzer

7. SplitChunks抽取公共代码

抽离第三方模块
- 不要和业务逻辑放在一起
- 增加缓存 304

```
module.exports = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                },
                vendor: {
                    test: /node_modules/,
                    minSize: 0,
                    minChunks: 2,
                    priority: 1
                }
            }
        }
    }
}
```

8. 热更新

- 通过devServer来启动热更新
- webpack自带插件支持热更新
```
// webpack.config.js文件

const webpack = require('webpack');

module.exports = {
    devServer: {
        hot: true,  // 启动热更新
        port: 8080,
        contentBase: './dist'
    },
    plugins: [
        // 支持热更新插件
        new webpack.HotModuleReplacementPlugin(),
        // 打印更新的模块路径
        new webpack.NamedModulesPlugin()
    ]
}
```
在你的入口文件添加热更新操作
```
// index.js文件


// 导入你需要热更新的模块
import common from './common';

// 模块是否支持热更新
if (module.hot) {
    module.hot.accept('./common', () => {
        console.log('文件更新了');
    });
}

```
9. IgnorePlugin
忽略打包第三方插件指定的目录

new webpack.IgnorePlugion(/\./\locale/, /moment/);

10. noParse

noParse的作用是不去解析你所使用的第三方库中的依赖库

忽略大型的库可以提高构建性能(如：jquery和lodash)
```
module.exports = {
    module: {
        noParse: /jquery|lodash/,  // 不去解析jquery或lodash中的依赖库
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}
```
11. resolve

resolve常用配置
- modules  
    - 指定解析第三方包的目录位置
- alias
    - 指定import导入时的别名，简化引入
- extensions
    - 自动解析确定好的扩展名
```
// webpack.config.js文件

module.exports = {
    resolve: {
        modules: [path.resolve('node_modules')],
        alias: {
            Utils: path.resolve(__dirname, 'src/utils/')
        },
        extensions: ['.js', '.css', '.json']
    }
}
```
12. include和exclude
- include: 包含指定目录下的文件解析
- exclude: 排除指定目录不进行解析

二者使用一个即可了
```
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exculde: /node_modules/,    // 二选一
                include: path.resolve('src')    // 二选一
            }
        ]
    }
}
```

13. happypack

模块，可以实现多进程来打包
```
// webpack.config.js文件

const Happypack = require('happypack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'Happypack/loader?id=js'
            },
            {
                test: /\.css$/,
                use: 'Happypack/loader?id=css'
            }
        ]
    },
    plugins: [
        new Happypack({
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
            use: ['style-loader', 'css-loader']
        })
    ]
}
```