//基于node 的遵循common.js规范
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//热更新需要webpack模块
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// 将css和less分别抽离为不同的文件(要上线了才用,这种模式更改样式不会更新)
// const lessExtract = new ExtractTextWebpackPlugin('css/less.css');
// const cssExtract = new ExtractTextWebpackPlugin('css/css.css');

// 禁用功能
const lessExtract = new ExtractTextWebpackPlugin({
    disable: true,
    filename: 'css/less.css'
});
const cssExtract = new ExtractTextWebpackPlugin({
    disable: true,
    filename: 'css/css.css'
});

//去除不需要的css
const PurifycssWebpack = require('purifycss-webpack');
const glob = require('glob');

// copy文件夹到指定目录
const CopyWebpackPlugin = require('copy-webpack-plugin');

//加载.vue文件配置plugins
const VueLoaderPlugin = require("vue-loader/lib/plugin")

// 单页index.html引入多个js
//多页index.html index.js / b.html b.js
module.exports = {
    //单入口文件
    entry: './src/index.js',

    //多入口文件打包为一个js
    // entry: ['./src/index.js', './src/a.js'],

    //多入口文件，打包为多个js
    // entry: {
    //     index: './src/index.js',
    //     a: './src/a.js'
    // },

    // 单出口文件
    output: {
        filename: '[name].[hash:8].js',//引入8位哈希值用于清缓存
        //这个路径必须是绝对路径
        path: path.resolve('./build')
    },

    // 多出口文件
    // output: {
    //     filename: '[name].[hash:8].js',//引入8位哈希值用于清缓存
    //     //这个路径必须是绝对路径
    //     path: path.resolve('./build')
    // },

    //开发服务器
    devServer: {
        //定义服务的根目录
        contentBase: './build',
        port: 3000,
        //服务器压缩
        compress: true,
        //自动打开浏览器
        open: true,
        //热更新，需要同时引入webpack
        hot: true,
        stats: {
            //添加构建模块信息
            modules: false
        }
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@": path.resolve("src")
        }
    },
    //模块配置
    module: {
        rules: [//从右往左写，loader可以传参
            {
                test: /\.css$/, use: cssExtract.extract({
                    fallback: 'style-loader',//加上后会以style的形式引入
                    use: [
                        { loader: 'css-loader' }
                    ]
                })
            },
            {
                test: /\.less$/, use: lessExtract.extract({
                    fallback: 'style-loader',//加上后会以style的形式引入
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'less-loader' }
                    ]
                })
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    //插件的配置
    plugins: [
        lessExtract,
        cssExtract,

        // 拷贝插件
        new CopyWebpackPlugin([
            {
                from: './src/doc',
                to: 'public'
            }
        ]),

        //引入插件并规定抽离的出css的文件名称及位置
        // new ExtractTextWebpackPlugin({
        //     filename: 'css/index.css'
        // }),
        //hot更新配置
        new webpack.HotModuleReplacementPlugin(),
        //先清除build文件夹，再用HTML插件重新打包,要放在HTML插件之前
        new CleanWebpackPlugin(['./build']),
        // 打包为一个html的HTML插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            //可以用ejs模板的方式给页面传数据
            title: 'webpack',
            //引入哈希值，用于清缓存
            hash: true,
            //压缩html代码
            // minify: {
            //     //除去html中的双引号
            //     removeAttributeQuotes: true,
            //     //折叠空行，将html压缩为一行
            //     collapseWhitespace: true
            // }
        }),

        //没用到的css会被消除掉， 一定要写在HtmlWebpackPlugin插件后面
        new PurifycssWebpack({
            paths: glob.sync(path.resolve('./src/*.html'))
        }),

        //打包为多个个html的HTML插件
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     chunks: ['index'],
        //     template: './src/index.html',
        //     //可以用ejs模板的方式给页面传数据
        //     title: 'webpack',
        //     //引入哈希值，用于清缓存
        //     hash: true
        // }),
        // new HtmlWebpackPlugin({
        //     filename: 'a.html',
        //     chunks: ['a'],
        //     template: './src/index.html',
        //     //可以用ejs模板的方式给页面传数据
        //     title: 'webpack',
        //     //引入哈希值，用于清缓存
        //     hash: true
        // }),

        //加载vue文件plugin
        new VueLoaderPlugin()
    ],
    //可以更改模式
    mode: 'development',
    //配置解析
    resolve: {}


}