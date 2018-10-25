//基于node 的遵循common.js规范
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 单页index.html引入多个js
//多页index.html index.js / b.html b.js
module.exports = {
    //单入口文件
    // entry: './src/index.js', 
    //多入口文件打包为一个js
    // entry: ['./src/index.js', './src/a.js'],
    //多入口文件，打包为多个js
    entry: {
        index: './src/index.js',
        a: './src/a.js'
    },
    //单出口文件
    // output: {
    //     filename: 'build.[hash:8].js',//引入8位哈希值用于清缓存
    //     //这个路径必须是绝对路径
    //     path: path.resolve('./build')
    // },
    // 多出口文件
    output: {
        filename: '[name].[hash:8].js',//引入8位哈希值用于清缓存
        //这个路径必须是绝对路径
        path: path.resolve('./build')
    },
    //开发服务器
    devServer: {
        //定义服务的根目录
        contentBase: './build',
        port: 3000,
        //服务器压缩
        compress: true,
        //自动打开浏览器
        open:true
    },
    //模块配置
    module: {},
    //插件的配置
    plugins: [
        //先清除build文件夹，再用HTML插件重新打包,要放在HTML插件之前
        new CleanWebpackPlugin(['./build']),
        //打包为一个html的HTML插件
        // new HtmlWebpackPlugin({
        //     template: './src/index.html',
        //     //可以用ejs模板的方式给页面传数据
        //     title: 'webpack',
        //     //引入哈希值，用于清缓存
        //     hash: true,
        //     //压缩html代码
        //     // minify: {
        //     //     //除去html中的双引号
        //     //     removeAttributeQuotes: true,
        //     //     //折叠空行，将html压缩为一行
        //     //     collapseWhitespace: true
        //     // }
        // }),
        //打包为多个个html的HTML插件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            template: './src/index.html',
            //可以用ejs模板的方式给页面传数据
            title: 'webpack',
            //引入哈希值，用于清缓存
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'a.html',
            chunks: ['a'],
            template: './src/index.html',
            //可以用ejs模板的方式给页面传数据
            title: 'webpack',
            //引入哈希值，用于清缓存
            hash: true
        }),

    ],
    //可以更改模式
    mode: 'development',
    //配置解析
    resolve:{}


}